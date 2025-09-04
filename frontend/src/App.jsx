import React from "react";
import { ThemeProvider } from "./hooks/useTheme";
import Routes from "./Routes";
import MagicBento from "./components/ui/MagicBento";

function App() {
  return (
    <ThemeProvider>
      <div className="relative z-0">
        <MagicBento />
        <Routes />
      </div>
    </ThemeProvider>
  );
}

export default App;