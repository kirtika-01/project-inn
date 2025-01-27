import React, { useState } from "react";
import RequestsSection from "./RequestsSection";
import AcceptedTeamsSection from "./AcceptedTeamsSection";
import "./App.css";
import Header from "./Header"; // Import the Header component
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
    console.log(`Revise request sent for project ID: ${id}`);
    toast.success("Revise request sent to student dashboard");
    setRequests(requests.filter((req) => req.id !== id));
  };
// Logout function
const handleLogout = () => {
  // Add logout logic here (e.g., clear session, redirect to login page)
  console.log("User  logged out");
  toast.success("Logged out successfully");
  // Example: Redirect to login page
  // window.location.href = "/login";
};
  return (
    <div className="dashboard-container">
      <Header onLogout={handleLogout} className="dashboard-header" />
      
      <main className="dashboard-main">
        {requests.length > 0 ? (
          <RequestsSection
            requests={requests}
            onAccept={handleAccept}
            onReject={handleReject}
            onRevise={handleRevise}
          />
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
      </main>
      <footer className="dashboard-footer">
        &copy; 2025 Team Management
      </footer>
      <ToastContainer />
    </div>
  );
};

export default App;