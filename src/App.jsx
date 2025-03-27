import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import MentorDashboard from "./MentorDashboard";
import LoginForm from "./Login.jsx";
import EvaluationPanel from "./EvaluationPanel"; // Import the EvaluationPanel component
import LandingPage from "./LandigPage.jsx"; // Import Landing Page

const App = () => {
  const isAuthenticated = !!localStorage.getItem("token"); // Check if a token exists

  return (
    <Router>
      <Routes>
        {/* Redirect to mentor dashboard if authenticated, else show login */}
        <Route path="/" element={<LandingPage />} />
        {/* <Route path="/" element={isAuthenticated ? <Navigate to="/mentor-dashboard" /> : <LoginForm />} /> */}
        <Route path="/login" element={<LoginForm />} />
        <Route path="/ulogin" element={<h2>Temporary Login Page</h2>} />

        <Route path="/mentor-dashboard/*" element={isAuthenticated ? <MentorDashboard /> : <Navigate to="/login" />} />
        {/* Catch-all route to handle undefined paths */}
        {/* <Route path="*" element={<Navigate to={isAuthenticated ? "/mentor-dashboard" : "/login"} />} /> */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};


export default App;
