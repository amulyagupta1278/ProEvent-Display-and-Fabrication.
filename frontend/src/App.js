import React from "react";
import "./App.css";
import LandingPage from "./pages/LandingPage";
import { Toaster } from "sonner";

function App() {
  return (
    <div>
      <LandingPage />
      <Toaster richColors expand={false} position="top-right" />
    </div>
  );
}

export default App;
