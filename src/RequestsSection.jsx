import React, { useEffect, useState } from "react";
import axios from "axios";
import "./RequestsSection.css";

const RequestsSection = ({ requests, onAccept, onReject, onRevise, updateAcceptedTeams }) => {
  const [acceptedTeams, setAcceptedTeams] = useState([]);

  useEffect(() => {
    console.log("Requests:", requests);
  }, [requests]);

  // const handleAccept = async (request) => {
  //   console.log("✅ Request Object:", req); // Debugging output
  //   console.log("✅ Sending ID:", request.id); // ✅ Ensure ID is being sent
  //   // if (!req || !req.id) {
  //   //   console.error("❌ Invalid ID: Request ID is undefined.",req);
  //   //   return;
  //   // }
  //   if (!req) {
  //     console.error("❌ req is undefined or null");
  //     return;
  //   }
  
  //   if (!req.id) {
  //     console.error("❌ Invalid ID: Request ID is undefined.", req);
  //     return;
  //   }
  
  //   try {
  //     // console.log("✅ Sending ID:", id); // Log the ID before making the request
  //     // await axios.post("http://localhost:5000/api/acceptedTeams/accept", { id }); 
  //     // console.log(`✅ Team with ID ${id} accepted`);
  //     // setAcceptedTeams([...acceptedTeams, id]); 

  //     const response = await axios.post("http://localhost:5000/api/acceptedTeams/accept", {
  //       id: request.id, // ✅ Include ID
  //       teamName: request.teamName,
  //       projectName: request.projectName,
  //       description: request.description,
  //       teamMembers: request.teamMembers,
  //     });
  //     console.log("✅ Request accepted:", response.data);
  //   } catch (error) {
  //     console.error("❌ Request failed", error);
  //   }
  // };
  const handleAccept = async (request) => {
    console.log("✅ Request Object:", request); // Debugging output

    if (!request) {
        console.error("❌ request is undefined or null");
        return;
    }

    if (!request.id) {
        console.error("❌ Invalid ID: Request ID is undefined.", request);
        return;
    }

    try {
        console.log("✅ Sending ID:", request.id); // ✅ Ensure ID is being sent

        const response = await axios.post("http://localhost:5000/api/acceptedTeams/accept", {
            id: request.id, // ✅ Include ID
            teamName: request.teamName,
            projectName: request.projectName,
            description: request.description,
            teamMembers: request.teamMembers,
        });

        console.log("✅ Request accepted:", response.data);
        // Call `onAccept` to update the accepted teams in App.jsx
      onAccept(request.id);
        // Update Accepted Teams Section
        // updateAcceptedTeams(response.data);
        
    } catch (error) {
        console.error("❌ Request failed", error);
    }
};


  return (
    <section className="requests-section">
      <h2>Requests</h2>
      <div className="requests-list">
        {requests.map((req,index) => (
          
          <div key={index} className="request-item" title={req.description}>
            <p><strong>Project:</strong> {req.projectName}</p>
            <p><strong>Team:</strong> {req.teamName}</p>
            <div className="request-buttons">
            <button onClick={() => {
  console.log("✅ Request Object:", req); // Debugging output
  handleAccept(req);
}} className="accept-button">
  Accept
</button>
              <button onClick={() => onReject(req._id)} className="reject-button">
                Reject
              </button>
              <button onClick={() => onRevise(req._id)} className="revise-button">
                Revise
              </button>
              <div className="dropdown">
                <button className="more-button">More</button>
                <ul className="dropdown-list">
                  {req.teamMembers.map((member, index) => (
                    <li key={`${req._id}-${index}`}>{member}</li>
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
