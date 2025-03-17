import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MentorDashboard from "./MentorDashboard";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Instead of path="/" use path="*" to allow nested routes */}
        <Route path="*" element={<MentorDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
