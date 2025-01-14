import React from "react";
import "./RequestsSection.css";

const RequestsSection = ({ requests, onAccept, onReject, onRevise }) => {
  return (
    <section className="requests-section">
      <h2>Requests</h2>
      <div className="requests-list">
        {requests.map((req) => (
          <div key={req.id} className="request-item" title={req.description}>
            <p>
              <strong>Project:</strong> {req.projectName}
            </p>
            <p>
              <strong>Team:</strong> {req.teamName}
            </p>
            <div className="request-buttons">
              <button onClick={() => onAccept(req.id)} className="accept-button">Accept</button>
              <button onClick={() => onReject(req.id)} className="reject-button">Reject</button>
              <button onClick={() => onRevise(req.id)} className="revise-button">Revise</button>
              <div className="dropdown">
                <button className="more-button">More</button>
                <ul className="dropdown-list">
                  {req.teamMembers.map((member, index) => (
                    <li key={index}>{member}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RequestsSection;
