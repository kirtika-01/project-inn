import React, { useEffect, useState } from "react"; // ✅ Correct

import axios from "axios";
import "./AcceptedTeamsSection.css";


const AcceptedTeamsSection = ({ acceptedTeams }) => {
  const [acceptedTeamsState, setAcceptedTeams] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);
  useEffect(() => {
    const fetchAcceptedTeams = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/acceptedTeams");
        setAcceptedTeams(response.data);
        console.log("✅ Accepted Teams Updated:", response.data);
      } catch (error) {
        console.error("❌ Error fetching accepted teams:", error);
      }
    };

    fetchAcceptedTeams();
  }, [acceptedTeams]); // Update when new teams are accepted
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
    
    const handleFormCancel = () => {
      setShowForm(false);
  };

  return (
    <section className="accepted-section">
      <h2>Accepted Teams</h2>
      <div className="accepted-teams-list">
      {acceptedTeamsState.length === 0 ? (
  <p>No accepted teams yet.</p>
) : (
  acceptedTeamsState.map((team) => (
    <div key={team._id} className="team-card">
      <h3>{team.teamName}</h3>
      <p>{team.projectName}</p>
      <p>{team.description}</p>
      <button
        className="meet-button"
        onClick={() => handleMeetClick(team)}
      >
        Meet
      </button>
    </div>
  ))
)}

      </div>

      {/* Pop-up Form */}
      {showForm && (
        <div className="popup-overlay">
          <div className="popup-form">
            <span className="close-btn"  aria-label="Close form" onClick={() => setShowForm(false)}>
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
          <option value="A">excellent</option>
          <option value="B">very good</option>
          <option value="C">good</option>
          <option value="D">bad</option>
        </select>

        {/* Submit Button */}
        <button type="submit">Submit</button>
        <button type="button" onClick={handleFormCancel}>
                Cancel
              </button>
      </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default AcceptedTeamsSection;