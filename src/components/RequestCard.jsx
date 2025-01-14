import React, { useState } from "react";
import "./RequestCard.css";

const RequestCard = ({ request }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return (
    <div
      className={`request-card ${isHovered ? "hovered" : ""}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="content">
        <div className="brief">
          <strong>Team:</strong> {request.team} | <strong>Project:</strong>{" "}
          {request.project}
        </div>
        <div className={`details ${isHovered ? "show" : ""}`}>
          {request.details}
        </div>
      </div>
      <div className="actions">
        <button className="accept">Accept</button>
        <button className="deny">Deny</button>
        <button className="revise">Revise</button>
        <button className="more">More</button>
      </div>
    </div>
  );
};

export default RequestCard;
