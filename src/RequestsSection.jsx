import React, { useEffect, useState } from "react";
import axios from "axios";
import "./RequestsSection.css";

const RequestsSection = () => {
  const [requests, setRequests] = useState([]);


    // Fetch mentor requests from the database
    useEffect(() => {
      const fetchRequests = async () => {
        try {
          const response = await axios.get("http://localhost:5000/api/mentor-requests");
          setRequests(response.data);
        } catch (error) {
          console.error("Error fetching mentor requests:", error);
        }
      };
  
      fetchRequests();
    }, []);

 
// const handleAccept = async (request) => {
//   console.log("✅ Request Object:", request); // Debugging output
//   if (!request || !request._id || !request.projectName || !request.members || !request.projectDescription) {
//     console.error("❌ Missing required request fields:", request);
//     return;
//   }
//   try {
//     console.log("✅ Sending Request with ID:", request._id);

//     const response = await axios.post("http://localhost:5000/api/accepted-requests", {
//       requestId: request._id, // ✅ Ensure ID is included correctly
//       teamName: request.projectDescription,
//       projectName: request.projectName,
//       teamMembers: request.members.map(member => ({
//         name: member.name})),
//       description: request.projectDescription,
//     },{
//       headers: { "Content-Type": "application/json" }
//     }
//   );

//     console.log("✅ Request accepted:", response.data);
//     setRequests(requests.filter((req) => req._id !== request._id)); // Remove from UI

//   } catch (error) {
//     console.error("❌ Request failed:", error.response ? error.response.data : error.message);

//   }
// };


// console.log("✅ Request accepted:", response.data);

const handleAccept = async (request) => {
  console.log("✅ Request Object:", request);

  if (!request || !request.projectName || !request.members || !request.projectDescription) {
      console.error("❌ Missing required request fields:", request);
      return;
  }

  // ✅ Auto-generate teamName based on projectName
  const teamName = `Team_${request.projectName.replace(/\s+/g, '_')}_${Math.floor(Math.random() * 1000)}`;
console.log("🔹 Generated Team Name:", teamName);
  try {
      console.log("📤 Sending Data:", {
         
          teamName, // ✅ Auto-generated team name
          projectName: request.projectName,
          teamMembers: request.members.map(member => ({
              name: member.name || "Unknown",
              rollno: member.rollno || "N/A",
          })),
          description: request.projectDescription,
      });

      const response = await axios.post("http://localhost:5000/api/accepted-requests", {
          requestId: request._id,
          teamName, // ✅ Using generated team name
          projectName: request.projectName,
          teamMembers: request.members.map(member => ({
              name: member.name || "Unknown",
              rollno: member.rollno || "N/A",
          })),
          description: request.projectDescription,
      }, {
          headers: { "Content-Type": "application/json" }
      });

      console.log("✅ Request Accepted:", response.data);
      setRequests(requests.filter((req) => req._id !== request._id)); // Remove from UI

  } catch (error) {
      console.error("❌ Request failed:", error.response ? error.response.data : error.message);
  }
};

  return (
    <section className="requests-section">
      <h2>Requests</h2>
      <div className="requests-list">
        {requests.length === 0 ? (
        <p>No requests available.</p>
      ) : (
        requests.map((request) => (
          
          <div key={request._id} className="request-item" >
            <p><strong>Project:</strong> {request.projectName}</p>
            <p><strong>Team:</strong> {request.projectDescription}</p>
            <div className="request-buttons">

<button
  onClick={() => {
    console.log("Clicked Accept for:", request);

    if (!request || !request.projectName || !request.members) {
      console.error("❌ Missing required request fields:", request);
      return;
    }
    

    handleAccept(request);
  }}
  className="accept-button"
>
  Accept
</button>
              <button onClick={() => onReject(request._id)} className="reject-button">
                Reject
              </button>
              <button onClick={() => onRevise(request._id)} className="revise-button">
                Revise
              </button>
              <div className="dropdown">
                <button className="more-button">More</button>
                {/* <ul className="dropdown-list">
                  {req.teamMembers.map((member, index) => (
                    <li key={${request._id}-${index}}>{member}</li>
                  ))}
                </ul> */}
              </div>
            </div>
          </div>
        )))}
      </div>
    </section>
  );
};

export default RequestsSection;