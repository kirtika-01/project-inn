import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RequestsSection from "./RequestsSection";
import AcceptedTeamsSection from "./AcceptedTeamsSection";
import Header from "./Header";
import EvaluationPanel from "./EvaluationPanel"; // Import the new page
import "./App.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [requests, setRequests] = useState([
    { id: 1, projectName: "Project A", teamName: "Team Alpha", description: "Idea A description", teamMembers: ["Alice", "Bob"] },
    { id: 2, projectName: "Project B", teamName: "Team Beta", description: "Idea B description", teamMembers: ["Charlie", "David"] },
  ]);

  const [acceptedTeams, setAcceptedTeams] = useState([]);

  const handleAccept = (id) => {
    const acceptedRequest = requests.find((req) => req.id === id);
    setAcceptedTeams((prev) => [...prev, acceptedRequest]);
    setRequests(requests.filter((req) => req.id !== id));
  };

  const handleReject = (id) => {
    setRequests(requests.filter((req) => req.id !== id));
  };

  const handleRevise = (id) => {
    toast.success("Revise request sent to student dashboard");
    setRequests(requests.filter((req) => req.id !== id));
  };

  const handleLogout = () => {
    toast.success("Logged out successfully");
  };

  return (
    <Router>
      <div className="dashboard-container">
        <Header onLogout={handleLogout} className="dashboard-header" />
        <main className="dashboard-main">
          <Routes>
            <Route path="/" element={
              <>
                {requests.length > 0 ? (
                  <RequestsSection requests={requests} onAccept={handleAccept} onReject={handleReject} onRevise={handleRevise} />
                ) : (
                  <div className="accepted-section full-width">
                    <AcceptedTeamsSection acceptedTeams={acceptedTeams} />
                  </div>
                )}
                {requests.length > 0 && (
                  <div className="accepted-section">
                    <AcceptedTeamsSection acceptedTeams={acceptedTeams} />
                  </div>
                )}
              </>
            } />
            <Route path="/evaluation-panel" element={<EvaluationPanel />} />
          </Routes>
        </main>
        <footer className="dashboard-footer">
          &copy; 2025 Team Management
        </footer>
        <ToastContainer />
      </div>
    </Router>
  );
};

export default App;
