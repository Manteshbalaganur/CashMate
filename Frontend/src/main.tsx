import { createRoot } from "react-dom/client";
import { ClerkProvider } from "@clerk/clerk-react";
import { BrowserRouter } from "react-router-dom";   // ⭐ ADD THIS
import App from "./app/App.tsx";
import "./styles/index.css";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

createRoot(document.getElementById("root")!).render(
  <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
    <BrowserRouter>   {/* ⭐ ADD THIS */}
      <App />
    </BrowserRouter>
  </ClerkProvider>
);
