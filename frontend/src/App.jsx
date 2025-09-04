import React from "react";
import { ThemeProvider } from "./hooks/useTheme";
import { AuthProvider } from "./contexts/AuthContext";
import Routes from "./Routes";
import MagicBento from "./components/ui/MagicBento";

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <div className="relative z-0">
          <MagicBento />
          <Routes />
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;