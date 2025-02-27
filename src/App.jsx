import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RequestsSection from "./RequestsSection";
import AcceptedTeamsSection from "./AcceptedTeamsSection";
import Header from "./Header";
import EvaluationPanel from "./EvaluationPanel";
import axios from "axios";  // ✅ Import axios for API calls
import "./App.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [requests, setRequests] = useState([]);
  const [acceptedTeams, setAcceptedTeams] = useState([]);

  // ✅ Fetch requests from MongoDB when component loads
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/mentor-requests");
        setRequests(response.data);
      } catch (error) {
        console.error("Error fetching mentor requests:", error);
      }
    };
    const fetchAcceptedTeams = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/accepted-requests");
        setAcceptedTeams(response.data);
      } catch (error) {
        console.error("❌ Error fetching accepted teams:", error.response?.data || error.message);
      }
    };
    fetchRequests();
    fetchAcceptedTeams();
  }, []);

  // ✅ Function to update accepted teams
  const updateAcceptedTeams = (newTeam) => {
    setAcceptedTeams((prev) => [...prev, newTeam]);
  };

  // ✅ Handle Accept Request
  const handleAccept = async (id) => {
    try {
      const acceptedRequest = requests.find((req) => req._id === id);
      if (!acceptedRequest) {
        console.warn("⚠️ Request not found!");
        return;
      }

      // ✅ Send accepted request to backend
      await axios.post("http://localhost:5000/api/accepted-requests", { id });

      // ✅ Update UI: Move request to accepted teams
      updateAcceptedTeams(acceptedRequest);
      setRequests(requests.filter((req) => req._id !== id));
      
      toast.success("Request Accepted Successfully!");

    } catch (error) {
      console.error("Error accepting request:", error);
      toast.error("Failed to accept request.");
    }
  };

  // ✅ Handle Reject Request
  const handleReject = (id) => {
    setRequests(requests.filter((req) => req._id !== id));
  };

  // ✅ Handle Revise Request
  const handleRevise = (id) => {
    toast.success("Revise request sent to student dashboard");
    setRequests(requests.filter((req) => req._id !== id));
  };

  // ✅ Handle Logout
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