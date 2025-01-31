import React, { useState, useEffect } from "react";
import "./EvaluationPanel.css";

const EvaluationPanel = () => {
  const [teams, setTeams] = useState([]);
  const [expandedTeam, setExpandedTeam] = useState(null);
  const [evaluations, setEvaluations] = useState({});
  const [isEvaluation1Submitted, setIsEvaluation1Submitted] = useState({});

  useEffect(() => {
    const fetchAssignedTeams = async () => {
      const dummyData = [
        { id: 1, name: "Team Alpha", project: "AI-Powered Chatbot", mentor: "Dr. Smith" },
        { id: 2, name: "Team Beta", project: "Blockchain Voting System", mentor: "Prof. Johnson" },
        { id: 3, name: "Team Gamma", project: "Smart Traffic Management", mentor: "Dr. Lee" }
      ];
      setTeams(dummyData);
    };

    fetchAssignedTeams();
  }, []);

  const handleEvaluateClick = (teamId) => {
    setExpandedTeam(expandedTeam === teamId ? null : teamId);
  };

  const handleEvaluationChange = (teamId, evaluationNumber, value) => {
    setEvaluations((prev) => ({
      ...prev,
      [teamId]: {
        ...prev[teamId],
        [evaluationNumber]: value,
      },
    }));
  };

  const handleEvaluationSubmit = (teamId, evaluationNumber) => {
    console.log(`Evaluation ${evaluationNumber} submitted for team ${teamId}:`, evaluations[teamId]?.[evaluationNumber]);
    if (evaluationNumber === "evaluation1") {
      setIsEvaluation1Submitted((prev) => ({
        ...prev,
        [teamId]: true, // Mark Evaluation 1 as submitted
      }));
    }
  };

  return (
    <div className="evaluation-panel">
      <h2 className="heading">Assigned Teams</h2>
      <div className="team-list">
        {teams.length > 0 ? (
          teams.map((team) => (
            <div key={team.id} className="team-bar">
              <div className="team-info">
                <strong>{team.name}</strong> - {team.project} (Mentor: {team.mentor})
              </div>
              <button className="evaluate-btn" onClick={() => handleEvaluateClick(team.id)}>
                {expandedTeam === team.id ? "Close" : "Evaluate"}
              </button>
              {expandedTeam === team.id && (
                <div className="evaluation-section">
                  <div className="evaluation-item">
                    <label>Evaluation 1:</label>
                    <input
                      type="number"
                      placeholder="Enter evaluation marks"
                      value={evaluations[team.id]?.evaluation1 || ""}
                      onChange={(e) => handleEvaluationChange(team.id, "evaluation1", e.target.value)}
                    />
                    <button onClick={() => handleEvaluationSubmit(team.id, "evaluation1")}>
                      Submit
                    </button>
                  </div>
                  <div className="evaluation-item">
                    <label>Evaluation 2:</label>
                    <input
                      type="number"
                      placeholder="Enter evaluation marks"
                      value={evaluations[team.id]?.evaluation2 || ""}
                      onChange={(e) => handleEvaluationChange(team.id, "evaluation2", e.target.value)}
                      disabled={!isEvaluation1Submitted[team.id]} // Disabled until Evaluation 1 is submitted
                    />
                    <button
                      onClick={() => handleEvaluationSubmit(team.id, "evaluation2")}
                      disabled={!isEvaluation1Submitted[team.id]} // Disabled until Evaluation 1 is submitted
                    >
                      Submit
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="no-teams">No assigned teams available.</p>
        )}
      </div>
    </div>
  );
};

export default EvaluationPanel;
