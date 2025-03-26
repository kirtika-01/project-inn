// import React, { useState, useEffect } from "react";
// import "./EvaluationPanel.css";
// const EvaluationPanel = () => {
//   const [teams, setTeams] = useState([]);
//   const [expandedTeam, setExpandedTeam] = useState(null);
//   const [evaluations, setEvaluations] = useState({});
//   const [isEvaluation1Submitted, setIsEvaluation1Submitted] = useState({});

//   useEffect(() => {
//     const fetchAssignedTeams = async () => {
//       const dummyData = [
//         { id: 1, name: "Team Alpha", project: "AI-Powered Chatbot", mentor: "Dr. Smith" },
//         { id: 2, name: "Team Beta", project: "Blockchain Voting System", mentor: "Prof. Johnson" },
//         { id: 3, name: "Team Gamma", project: "Smart Traffic Management", mentor: "Dr. Lee" }
//       ];
//       setTeams(dummyData);
//     };

//     fetchAssignedTeams();
//   }, []);

//   const handleEvaluateClick = (teamId) => {
//     setExpandedTeam(expandedTeam === teamId ? null : teamId);
//   };

//   const handleEvaluationChange = (teamId, evaluationNumber, value) => {
//     setEvaluations((prev) => ({
//       ...prev,
//       [teamId]: {
//         ...prev[teamId],
//         [evaluationNumber]: value,
//       },
//     }));
//   };

//   const handleEvaluationSubmit = (teamId, evaluationNumber) => {
//     console.log(`Evaluation ${evaluationNumber} submitted for team ${teamId}:`, evaluations[teamId]?.[evaluationNumber]);
//     if (evaluationNumber === "evaluation1") {
//       setIsEvaluation1Submitted((prev) => ({
//         ...prev,
//         [teamId]: true, // Mark Evaluation 1 as submitted
//       }));
//     }
//   };

//   return (
//     <div className="evaluation-panel">
//       <h2 className="heading">Assigned Teams</h2>
//       <div className="team-list">
//         {teams.length > 0 ? (
//           teams.map((team) => (
//             <div key={team.id} className="team-bar">
//               <div className="team-info">
//                 <strong>{team.name}</strong> - {team.project} (Mentor: {team.mentor})
//               </div>
//               <button className="evaluate-btn" onClick={() => handleEvaluateClick(team.id)}>
//                 {expandedTeam === team.id ? "Close" : "Evaluate"}
//               </button>
//               {expandedTeam === team.id && (
//                 <div className="evaluation-section">
//                   <div className="evaluation-item">
//                     <label>Evaluation 1:</label>
//                     <input
//                       type="number"
//                       placeholder="Enter evaluation marks"
//                       value={evaluations[team.id]?.evaluation1 || ""}
//                       onChange={(e) => handleEvaluationChange(team.id, "evaluation1", e.target.value)}
//                     />
//                     <button onClick={() => handleEvaluationSubmit(team.id, "evaluation1")}>
//                       Submit
//                     </button>
//                   </div>
//                   <div className="evaluation-item">
//                     <label>Evaluation 2:</label>
//                     <input
//                       type="number"
//                       placeholder="Enter evaluation marks"
//                       value={evaluations[team.id]?.evaluation2 || ""}
//                       onChange={(e) => handleEvaluationChange(team.id, "evaluation2", e.target.value)}
//                       disabled={!isEvaluation1Submitted[team.id]} // Disabled until Evaluation 1 is submitted
//                     />
//                     <button
//                       onClick={() => handleEvaluationSubmit(team.id, "evaluation2")}
//                       disabled={!isEvaluation1Submitted[team.id]} // Disabled until Evaluation 1 is submitted
//                     >
//                       Submit
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>
//           ))
//         ) : (
//           <p className="no-teams">No assigned teams available.</p>
//         )}
//       </div>
//     </div>
//   );
// };
// export default EvaluationPanel;
import React, { useState, useEffect } from "react";
import "./EvaluationPanel.css";

const EvaluationPanel = () => {
  const [teams, setTeams] = useState([]);
  const [expandedTeam, setExpandedTeam] = useState(null);
  const [evaluations, setEvaluations] = useState({});
  const [isEvaluation1Submitted, setIsEvaluation1Submitted] = useState(false);

  // Dummy Data
  const panelDummyData = {
    team_ids: ["CSD0001", "CSD0002", "CSD0003"],
  };

  const teamsDummyData = [
    {
      teamId: "CSD0001",
      teamName: "Team Alpha",
      project: "AI-Powered Chatbot",
      mentor: "Dr. Smith",
      teamSize: 2,
      teamMembers: [
        { rollNo: "2216001", name: "Aanchal Kumawat" },
        { rollNo: "2216002", name: "Astha Shukla" },
      ],
    },
    {
      teamId: "CSD0002",
      teamName: "Team Beta",
      project: "Blockchain Voting System",
      mentor: "Prof. Johnson",
      teamSize: 3,
      teamMembers: [
        { rollNo: "2216003", name: "Rajesh Verma" },
        { rollNo: "2216004", name: "Neha Singh" },
        { rollNo: "2216005", name: "Vikram Yadav" },
      ],
    },
    {
      teamId: "CSD0003",
      teamName: "Team Gamma",
      project: "Smart Traffic Management",
      mentor: "Dr. Lee",
      teamSize: 1,
      teamMembers: [{ rollNo: "2216006", name: "Pooja Sharma" }],
    },
  ];

  useEffect(() => {
    const fetchAssignedTeams = () => {
      const filteredTeams = teamsDummyData.filter((team) =>
        panelDummyData.team_ids.includes(team.teamId)
      );
      setTeams(filteredTeams);
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
      .find((team) => team.teamId === teamId)
      .teamMembers.every(
        (member) =>
          evaluations[teamId]?.[member.rollNo]?.evaluation1?.trim() !== ""
      );

  const isEvaluation2Complete = (teamId) =>
    teams
      .find((team) => team.teamId === teamId)
      .teamMembers.every(
        (member) =>
          evaluations[teamId]?.[member.rollNo]?.evaluation2?.trim() !== ""
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
        {teams.length > 0 ? (
          teams.map((team) => (
            <div key={team.teamId} className="team-bar">
              <div className="team-info">
                <strong>Team ID: {team.teamId}</strong>
              </div>
              <button
                className="evaluate-btn"
                onClick={() => handleEvaluateClick(team.teamId)}
              >
                {expandedTeam === team.teamId ? "Close" : "Evaluate"}
              </button>

              {expandedTeam === team.teamId && (
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
                        <tr key={member.rollNo}>
                          <td>{member.rollNo}</td>
                          <td>
                            <input
                              type="number"
                              placeholder="Marks"
                              value={
                                evaluations[team.teamId]?.[member.rollNo]
                                  ?.evaluation1 || ""
                              }
                              onChange={(e) =>
                                handleEvaluationChange(
                                  team.teamId,
                                  member.rollNo,
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
                                evaluations[team.teamId]?.[member.rollNo]
                                  ?.evaluation2 || ""
                              }
                              onChange={(e) =>
                                handleEvaluationChange(
                                  team.teamId,
                                  member.rollNo,
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
                              handleEvaluation1Submit(team.teamId)
                            }
                            disabled={
                              isEvaluation1Submitted ||
                              !isEvaluation1Complete(team.teamId)
                            }
                          >
                            Submit Evaluation 1
                          </button>
                        </td>
                        <td>
                          <button
                            className="submit-btn"
                            onClick={() =>
                              handleEvaluation2Submit(team.teamId)
                            }
                            disabled={
                              !isEvaluation1Submitted ||
                              !isEvaluation2Complete(team.teamId)
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
