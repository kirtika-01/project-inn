import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom"; // ✅ Import useNavigate
import RequestsSection from "./RequestsSection";
import AcceptedTeamsSection from "./AcceptedTeamsSection";
import Header from "./Header";
import EvaluationPanel from "./EvaluationPanel";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./MentorDashboard.css";

const MentorDashboard = () => {
  const [requests, setRequests] = useState([]);
  const [acceptedTeams, setAcceptedTeams] = useState([]);
  const navigate = useNavigate(); // ✅ Added useNavigate()

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

  const handleAccept = async (id) => {
    try {
      const acceptedRequest = requests.find((req) => req._id === id);
      if (!acceptedRequest) {
        console.warn("⚠️ Request not found!");
        return;
      }

      await axios.post("http://localhost:5000/api/accepted-requests", { id });

      setAcceptedTeams((prev) => [...prev, acceptedRequest]);
      setRequests(requests.filter((req) => req._id !== id));

      toast.success("Request Accepted Successfully!");
    } catch (error) {
      console.error("Error accepting request:", error);
      toast.error("Failed to accept request.");
    }
  };

  const handleReject = (id) => {
    setRequests(requests.filter((req) => req._id !== id));
  };

  const handleRevise = (id) => {
    toast.success("Revise request sent to student dashboard");
    setRequests(requests.filter((req) => req._id !== id));
  };
// Logout Functionality
const handleLogout = () => {
  localStorage.removeItem("token"); // Remove token
  localStorage.removeItem("mentor"); // Remove mentor data
  toast.success("Logged out successfully");
  navigate("/login"); // Redirect to login page
};

  return (
    <div className="dashboard-container">
      <Header onLogout={handleLogout} className="dashboard-header" />
      <main className="dashboard-main">
        {/* ✅ Ensure clicking "Evaluation Panel" in the sidebar navigates correctly */}
        {/* <button onClick={() => navigate("/evaluation-panel")}>Go to Evaluation Panel</button> */}

        <Routes> {/* ✅ Ensure Routes is properly wrapping components */}
          <Route 
            path="/" 
            element={
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
            } 
          />
          <Route path="/evaluation-panel" element={<EvaluationPanel />} /> {/* ✅ Fixed navigation */}
        </Routes>
      </main>
      <footer className="dashboard-footer">
        &copy; 2025 Team Management
      </footer>
      <ToastContainer />
    </div>
  );
};

export default MentorDashboard;
