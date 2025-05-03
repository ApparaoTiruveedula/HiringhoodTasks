import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AddTransaction from "./pages/AddTransaction";
import React from "react";

function App() {
  return (
    <Router>
      <div className="min-h-screen flex items-center justify-center bg-[hsl(var(--background))]">
        <div className="w-full max-w-2xl p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add" element={<AddTransaction />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
