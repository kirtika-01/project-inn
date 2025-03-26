
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./EvaluationPanel.css";

const EvaluationPanel = () => {
  const [teams, setTeams] = useState([]);
  const [expandedTeam, setExpandedTeam] = useState(null);
  const [evaluations, setEvaluations] = useState({});
  const [isEvaluation1Submitted, setIsEvaluation1Submitted] = useState(false);

  useEffect(() => {
    const fetchAssignedTeams = async () => {
      try {
        const token = localStorage.getItem("token"); // Ensure mentor is authenticated
        console.log("Token from localStorage:", token);
        if (!token) {
          console.error("No token found, please log in again.");
          return;
        }
        const response = await axios.get("http://localhost:5000/api/evaluation", {
          headers: { Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
         },
        });
        console.log("Assigned Teams Response:", response.data);
        setTeams(response.data.teams || []);
        // setTeams(response.data?.teams || []);
      } catch (error) {
        console.error("Error fetching assigned teams:", error);
      }
    };

    fetchAssignedTeams();
  }, []);

  const handleEvaluateClick = (teamId) => {
    setExpandedTeam(expandedTeam === teamId ? null : teamId);
  };

  const handleEvaluationChange = (teamId, rollNo, evaluationNumber, value) => {
    setEvaluations((prev) => ({
      ...prev,
      [teamId]: {
        ...prev[teamId],
        [rollNo]: {
          ...prev[teamId]?.[rollNo],
          [evaluationNumber]: value,
        },
      },
    }));
  };

  const isEvaluation1Complete = (teamId) =>
    teams
      .find((team) => team._id === teamId)
      .teamMembers.every(
        (member) =>
          evaluations[teamId]?.[member.enrollmentNumber]?.evaluation1?.trim() !== ""
      );

  const isEvaluation2Complete = (teamId) =>
    teams
      .find((team) => team._id === teamId)
      .teamMembers.every(
        (member) =>
          evaluations[teamId]?.[member.enrollmentNumber]?.evaluation2?.trim() !== ""
      );

  const handleEvaluation1Submit = (teamId) => {
    console.log(`Evaluation 1 Data for ${teamId}:`, evaluations[teamId]);
    setIsEvaluation1Submitted(true);
    alert(`Evaluation 1 submitted for Team ${teamId}`);
  };

  const handleEvaluation2Submit = (teamId) => {
    console.log(`Evaluation 2 Data for ${teamId}:`, evaluations[teamId]);
    alert(`Evaluation 2 submitted for Team ${teamId}`);
  };

  return (
    <div className="evaluation-panel">
      <h2 className="heading">Assigned Teams</h2>
      <div className="team-list">
        {Array.isArray(teams) && teams.length > 0 ? (
          teams.map((team) => (
            <div key={team._id} className="team-bar">
              <div className="team-info">
                <strong>Team ID: {team._id}</strong>
              </div>
              <button
                className="evaluate-btn"
                onClick={() => handleEvaluateClick(team._id)}
              >
                {expandedTeam === team._id ? "Close" : "Evaluate"}
              </button>

              {expandedTeam === team._id && (
                <div className="evaluation-section">
                  <table className="evaluation-table">
                    <thead>
                      <tr>
                        <th>Roll No</th>
                        <th>Evaluation 1</th>
                        <th>Evaluation 2</th>
                      </tr>
                    </thead>
                    <tbody>
                      {team.teamMembers.map((member) => (
                        <tr key={member.enrollmentNumber}>
                          <td>{member.enrollmentNumber}</td>
                          <td>
                            <input
                              type="number"
                              placeholder="Marks"
                              value={
                                evaluations[team._id]?.[member.enrollmentNumber]
                                  ?.evaluation1 || ""
                              }
                              onChange={(e) =>
                                handleEvaluationChange(
                                  team._id,
                                  member.enrollmentNumber,
                                  "evaluation1",
                                  e.target.value
                                )
                              }
                            />
                          </td>
                          <td>
                            <input
                              type="number"
                              placeholder="Marks"
                              value={
                                evaluations[team._id]?.[member.enrollmentNumber]
                                  ?.evaluation2 || ""
                              }
                              onChange={(e) =>
                                handleEvaluationChange(
                                  team._id,
                                  member.enrollmentNumber,
                                  "evaluation2",
                                  e.target.value
                                )
                              }
                              disabled={!isEvaluation1Submitted}
                            />
                          </td>
                        </tr>
                      ))}
                      <tr>
                        <td></td>
                        <td>
                          <button
                            className="submit-btn"
                            onClick={() =>
                              handleEvaluation1Submit(team._id)
                            }
                            disabled={
                              isEvaluation1Submitted ||
                              !isEvaluation1Complete(team._id)
                            }
                          >
                            Submit Evaluation 1
                          </button>
                        </td>
                        <td>
                          <button
                            className="submit-btn"
                            onClick={() =>
                              handleEvaluation2Submit(team._id)
                            }
                            disabled={
                              !isEvaluation1Submitted ||
                              !isEvaluation2Complete(team._id)
                            }
                          >
                            Submit Evaluation 2
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
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
