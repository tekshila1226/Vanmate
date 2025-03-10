import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import VanMateLanding from "./Pages/Dashboard1";
import VanMateDashboard from "./Pages/Dashboard2";
import RegisterPage from "./Pages/Registration";
import LoginPage from "./Pages/Login";
import VanDashboard from "./Pages/VanDisplay";
import VanDetail from "./Pages/VanDetails"; 
import StudentProfile from './Pages/StudentProfile';
import Attendance from "./Pages/Attendance"; 
import EditProfile from './Pages/EditProfile';
function App() {
  return (
    <Router>
      {/* Wrap everything inside Router */}
      <Routes>
        <Route path="/" element={<VanMateLanding />} />
        <Route path="/dashboard" element={<VanMateDashboard />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/van-dashboard" element={<VanDashboard />} /> 
        <Route path="/van/:vanId" element={<VanDetail />} /> {/* Route for van details */}
        <Route path="/profile/:studentId" element={<div>Profile Page (Not implemented)</div>} /> {/* Placeholder for profile */}
        <Route path="/edit-profile/:studentId" element={<EditProfile />} />
        <Route path="/facilities" element={<div>Facilities Page (Not implemented)</div>} /> {/* Placeholder for facilities */}
        <Route path="/student-profile" element={<StudentProfile />} />
        <Route path="/attendance" element={<Attendance />} />

        {/* Redirect any unknown routes back to landing page */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;