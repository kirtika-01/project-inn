import React, { useEffect, useState } from "react";
import axios from "axios";
import "./RequestsSection.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


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
const handleReject = async (id) => {
  try {
    const response = await fetch(`http://localhost:5000/api/requests/mentor-requests/${id}`, {

      method: "DELETE",
      headers: { "Content-Type": "application/json" }, // Ensure correct headers
    });

    if (!response.ok) {
      const errorText = await response.text(); // Read response as text
      throw new Error(`Failed to reject request: ${errorText}`);    }

    const data = await response.json(); // ✅ Ensure response is parsed
    console.log("Request rejected:", data);

    // ✅ Remove the rejected request from UI
    setRequests(prevRequests => prevRequests.filter(req => req._id !== id));

  } catch (error) {
    console.error("Error rejecting request:", error);
  }
};
const handleRevise = async (request) => {
  try {
    // 1️⃣ Send request data to the new "reviserequests" collection
    const response = await axios.post("http://localhost:5000/api/revised-requests", {
      projectName: request.projectName,
      teamMembers: request.members.map(member => ({
        name: member.name || "Unknown",
        rollno: member.rollno || "N/A",
      })),
      description: request.projectDescription,
    }, {
      headers: { "Content-Type": "application/json" }
    });

    console.log("✅ Request moved to revise-requests:", response.data);
     // Show success toast notification
     toast.success("Revise request sent to student dashboard");
    // 2️⃣ Update UI to remove the request
    setRequests(prevRequests => prevRequests.filter(req => req._id !== request._id));

  } catch (error) {
    console.error("❌ Error revising request:", error.response ? error.response.data : error.message);
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
              <button onClick={() => handleReject(request._id)} className="reject-button">
                Reject
              </button>
              <button onClick={() => handleRevise(request)} className="revise-button">
                Revise
              </button>
              <div className="dropdown">
                <button className="more-button">More</button>
                <ul className="dropdown-list">
                {request.members.map((member, index) => (
      <li key={`${member.name}-${index}`}>{member.name} ({member.rollno})</li>
    ))}
                </ul>
              </div>
            </div>
          </div>
        )))}
      </div>
    </section>
  );
};

export default RequestsSection;