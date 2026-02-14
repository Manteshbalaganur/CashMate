from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
from datetime import datetime
from database import transactions

# ---------------- APP INIT ----------------
app = Flask(__name__)
CORS(app)
from flask import jsonify

from flask_cors import CORS

# Right after app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": ["http://localhost:5173", "http://127.0.0.1:5173"]}})
# or for dev only: CORS(app)  # allows all origins (less secure, ok for local)

from flask import jsonify

@app.route('/test', methods=['GET'])
@app.route('/api/test', methods=['GET'])  # also support /api prefix
def test():
    return jsonify({
        "status": "ok",
        "message": "Backend connected! Ready for frontend calls.",
        "date": "2026-02-14"
    })
# ---------------- AI LOGIC ----------------
def generate_ai_suggestions(wallets):
    suggestions = []

    total = wallets["normal"] + wallets["cashback"] + wallets["emergency"]
    if total <= 0:
        return ["Not enough data to generate insights"]

    emergency_ratio = (wallets["emergency"] / total) * 100

    if emergency_ratio < 20:
        suggestions.append("Emergency fund is low. Try saving at least 20%.")

    if wallets["normal"] < 0:
        suggestions.append("Overspending detected. Reduce non-essential expenses.")

    if wallets["cashback"] > wallets["normal"] * 0.3:
        suggestions.append("Good cashback usage. Redirect cashback to savings.")

    return suggestions


# ---------------- HOME ----------------
@app.route("/")
def home():
    return "Backend running successfully"


# ---------------- ADD MANUAL EXPENSE ----------------
@app.route("/add-expense", methods=["POST"])
def add_expense():
    try:
        data = request.get_json()

        required = ["clerk_user_id", "amount", "category", "type"]
        if not data or not all(k in data for k in required):
            return jsonify({"error": "Missing fields"}), 400

        record = {
            "clerk_user_id": data["clerk_user_id"],
            "date": data.get("date"),
            "description": data.get("description", ""),
            "amount": float(data["amount"]),
            "category": data["category"],
            "type": data["type"],
            "created_at": datetime.utcnow()
        }

        transactions.insert_one(record)

        return jsonify({"message": "Expense added successfully"})

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ---------------- CSV UPLOAD ----------------
@app.route("/upload", methods=["POST"])
def upload_csv():
    try:
        clerk_user_id = request.form.get("clerk_user_id")
        file = request.files.get("file")

        if not clerk_user_id or not file:
            return jsonify({"error": "clerk_user_id or file missing"}), 400

        df = pd.read_csv(file)

        records = []
        for _, row in df.iterrows():
            records.append({
                "clerk_user_id": clerk_user_id,
                "date": row.get("date"),
                "description": row.get("description", ""),
                "amount": float(row.get("amount", 0)),
                "category": row.get("category", "normal"),
                "type": row.get("type", "debit"),
                "created_at": datetime.utcnow()
            })

        if records:
            transactions.insert_many(records)

        return jsonify({
            "message": "CSV uploaded successfully",
            "records_inserted": len(records)
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ---------------- GET TRANSACTIONS ----------------
@app.route("/transactions/<clerk_user_id>", methods=["GET"])
def get_transactions(clerk_user_id):
    try:
        data = list(
            transactions.find(
                {"clerk_user_id": clerk_user_id},
                {"_id": 0}
            )
        )
        return jsonify(data)

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ---------------- WALLET SUMMARY ----------------
@app.route("/wallets/<clerk_user_id>", methods=["GET"])
def wallet_summary(clerk_user_id):
    try:
        pipeline = [
            {"$match": {"clerk_user_id": clerk_user_id}},
            {"$group": {
                "_id": "$category",
                "total": {"$sum": "$amount"}
            }}
        ]

        result = transactions.aggregate(pipeline)

        wallets = {
            "normal": 0,
            "cashback": 0,
            "emergency": 0
        }

        for r in result:
            category = str(r["_id"]).lower()
            if "cashback" in category:
                wallets["cashback"] += r["total"]
            elif "emergency" in category:
                wallets["emergency"] += r["total"]
            else:
                wallets["normal"] += r["total"]

        return jsonify(wallets)

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ---------------- AI SUGGESTIONS ----------------
@app.route("/ai-suggestions/<clerk_user_id>", methods=["GET"])
def ai_suggestions(clerk_user_id):
    try:
        pipeline = [
            {"$match": {"clerk_user_id": clerk_user_id}},
            {"$group": {
                "_id": "$category",
                "total": {"$sum": "$amount"}
            }}
        ]

        result = transactions.aggregate(pipeline)

        wallets = {
            "normal": 0,
            "cashback": 0,
            "emergency": 0
        }

        for r in result:
            category = str(r["_id"]).lower()
            if "cashback" in category:
                wallets["cashback"] += r["total"]
            elif "emergency" in category:
                wallets["emergency"] += r["total"]
            else:
                wallets["normal"] += r["total"]

        suggestions = generate_ai_suggestions(wallets)

        return jsonify({
            "wallets": wallets,
            "suggestions": suggestions
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ---------------- RUN ----------------
# if __name__ == "__main__":
#     app.run(debug=True)
if __name__ == "__main__":
    app.run(debug=True, use_reloader=False)  # ← add use_reloader=False