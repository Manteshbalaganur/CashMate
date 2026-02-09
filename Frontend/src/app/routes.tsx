import { Routes, Route, Navigate } from "react-router-dom";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";

import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";

import { NormalDashboard } from "./pages/NormalDashboard";
import { WalletsPage } from "./pages/WalletsPage";
import { AIChatPage } from "./pages/AIChatPage";
import { UploadPage } from "./pages/UploadPage";
import { SuperDashboard } from "./pages/SuperDashboard";
import { InvestmentPlanPage } from "./pages/InvestmentPlanPage";
import { InsightsPage } from "./pages/InsightsPage";
import { ProfilePage } from "./pages/ProfilePage";

export default function AppRoutes() {
  return (
    <Routes>
      {/* ================= AUTH ================= */}
      <Route path="/sign-in/*" element={<SignInPage />} />
      <Route path="/sign-up/*" element={<SignUpPage />} />

      {/* ================= DEFAULT ================= */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      {/* ================= PROTECTED ================= */}
      <Route
        path="/dashboard"
        element={
          <>
            <SignedIn>
              <NormalDashboard />
            </SignedIn>
            <SignedOut>
              <RedirectToSignIn />
            </SignedOut>
          </>
        }
      />

      <Route
        path="/wallets"
        element={
          <SignedIn>
            <WalletsPage />
          </SignedIn>
        }
      />

      <Route
        path="/ai-chat"
        element={
          <SignedIn>
            <AIChatPage />
          </SignedIn>
        }
      />

      <Route
        path="/upload"
        element={
          <SignedIn>
            <UploadPage />
          </SignedIn>
        }
      />

      <Route
        path="/profile"
        element={
          <SignedIn>
            <ProfilePage />
          </SignedIn>
        }
      />

      <Route
        path="/super/dashboard"
        element={
          <SignedIn>
            <SuperDashboard />
          </SignedIn>
        }
      />

      <Route
        path="/super/investment"
        element={
          <SignedIn>
            <InvestmentPlanPage />
          </SignedIn>
        }
      />

      <Route
        path="/insights"
        element={
          <SignedIn>
            <InsightsPage />
          </SignedIn>
        }
      />

      {/* ================= UNKNOWN ================= */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
