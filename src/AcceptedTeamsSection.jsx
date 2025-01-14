import React, { useState } from "react";
import "./AcceptedTeamsSection.css";

const AcceptedTeamsSection = ({ acceptedTeams }) => {
  const [showForm, setShowForm] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);

  const handleMeetClick = (team) => {
    setSelectedTeam(team);
    setShowForm(true);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const date = formData.get("date");
    const workDescription = formData.get("workDescription");
    const grade = formData.get("grade");

    console.log("Form Data:", {
      team: selectedTeam,
      date,
      workDescription,
      grade,
    });

    // Close the form after submission
    setShowForm(false);
  };

  return (
    <section className="accepted-section">
      <h2>Accepted Teams</h2>
      <div className="accepted-teams-list">
        {acceptedTeams.map((team) => (
          <div key={team.id} className="team-card">
            <p>
              <strong>Project:</strong> {team.projectName}
            </p>
            <p>
              <strong>Team:</strong> {team.teamName}
            </p>
            <button
              className="meet-button"
              onClick={() => handleMeetClick(team)}
            >
              Meet
            </button>
          </div>
        ))}
      </div>

      {/* Pop-up Form */}
      {showForm && (
        <div className="popup-overlay">
          <div className="popup-form">
            <span className="close-btn" onClick={() => setShowForm(false)}>
              &times;
            </span>
            <h3>Schedule Meeting for {selectedTeam.teamName}</h3>
            <form onSubmit={handleFormSubmit}>
               {/* Date Field */}
        <label htmlFor="date">Date:</label>
        <input type="date" id="date" name="date" required />

        {/* Work Description Field */}
        <label htmlFor="workDescription">Work Description:</label>
        <textarea
          id="workDescription"
          name="workDescription"
          required
        ></textarea>

        {/* Grade Field */}
        <label htmlFor="grade">Grade:</label>
        <select id="grade" name="grade" required>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
          <option value="D">D</option>
        </select>

        {/* Submit Button */}
        <button type="submit">Submit</button>
      </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default AcceptedTeamsSection;