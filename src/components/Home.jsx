import React from "react";
import "./Home.css";

const acceptedTeams = [
  {
    teamName: "Team Innovators",
    project: "AI-based Trend Predictor",
    description: "Helps companies forecast trends using AI models.",
  },
  {
    teamName: "Tech Pioneers",
    project: "Blockchain Voting System",
    description: "Secure and transparent voting using blockchain.",
  },
  {
    teamName: "Creative Minds",
    project: "Virtual AR Museum",
    description: "An immersive AR platform for museum tours.",
  },
];

const Home = () => {
  return (
    <div className="home">
      <h2>Accepted Teams</h2>
      <div className="cards-container">
        {acceptedTeams.map((team, index) => (
          <div className="flash-card" key={index}>
            <h3>{team.teamName}</h3>
            <h4>{team.project}</h4>
            <p>{team.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
