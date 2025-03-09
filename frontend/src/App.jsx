import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import VanMateLanding from "./Pages/Dashboard1";
import VanMateDashboard from "./Pages/Dashboard2";
import RegisterPage from './Pages/Registration';
import  LoginPage from './Pages/Login';

function App() {
  return (
    <Router> {/* Wrap everything inside Router */}
      <Routes>
        <Route path="/" element={<VanMateLanding />} />
        <Route path="/dashboard" element={<VanMateDashboard />} /> 
        <Route path="/register" element={<RegisterPage />} /> 
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
