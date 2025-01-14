import React from "react";
import RequestCard from "./RequestCard";
import "./Requests.css";

const requests = [
  {
    teamName: "Team Innovators",
    brief: "An AI model for trend prediction.",
    details: "Analyzing trends to forecast fast fashion demands and optimize production.",
  },
  {
    teamName: "Tech Pioneers",
    brief: "Blockchain-based voting system.",
    details: "Secure and transparent voting using blockchain technology.",
  },
  {
    teamName: "Creative Minds",
    brief: "Virtual AR museum.",
    details: "Augmented reality platform for immersive museum tours.",
  },
];

const Requests = () => {
  return (
    <div className="requests">
      <h2>Project Requests</h2>
      <div className="request-list">
        {requests.map((request, index) => (
          <RequestCard key={index} request={request} />
        ))}
      </div>
    </div>
  );
};

export default Requests;
