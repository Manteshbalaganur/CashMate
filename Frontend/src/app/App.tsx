import { AuthProvider } from "./context/AuthContext";
import AppRoutes from "./routes";

export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}


 // Example: App.jsx or a component
// import { useEffect, useState } from 'react';

// function App() {
//   const [data, setData] = useState(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetch('/api/test')           // ← /api/ prefix → Vite proxies to http://127.0.0.1:5000/test
//       .then(res => {
//         if (!res.ok) throw new Error('Backend response not OK');
//         return res.json();
//       })
//       .then(result => setData(result))
//       .catch(err => setError(err.message));
//   }, []);

//   return (
//     <div>
//       <h1>CashMate Dashboard</h1>
//       {error && <p style={{color: 'red'}}>Error: {error}</p>}
//       {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : <p>Loading from backend...</p>}
      
//       {/* Your bar graph here later */}
//     </div>
//   );
// }

// export default App;