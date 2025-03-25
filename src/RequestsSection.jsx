import React, { useEffect, useState } from "react";
import axios from "axios";
import "./RequestsSection.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const RequestsSection = ({ mentor ,onTeamAccepted}) => {
  console.log("✅ RequestSection mounted!");

  const [requests, setRequests] = useState([]);


    // Fetch mentor requests from the database
    useEffect(() => {
        if (mentor?.id) {
            fetchRequests();
        }
    }, [mentor]);
      const fetchRequests = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/mentor-requests/${mentor.id}`);
          setRequests(response.data || []);
          console.log("📥 Requests fetched:", response.data);

        } catch (error) {
          console.error("Error fetching mentor requests:", error);
        }
      };
      // Function to generate unique team name
  const generateTeamName = (projectName="Project") => {
    return `Team_${projectName.replace(/\s+/g, "_")}_${Math.floor(
      Math.random() * 1000
    )}`;
  };
const handleAccept = async (request) => {
  console.log("✅ Request Object:", request);

  if (!request || !request.projectName || !request.teamMembers || !request.description||
    !Array.isArray(request.teamMembers) || !mentor) {
      console.error("❌ Missing required request fields:", request);
      return;
  }
  const teamName = generateTeamName(request.projectName);

  // ✅ Auto-generate teamName based on projectName
  // const teamName = `Team_${request.projectName.replace(/\s+/g, '_')}_${Math.floor(Math.random() * 1000)}`;
console.log("🔹 Generated Team Name:", teamName);
  try {
      console.log("📤 Sending Data:", {
        requestId: request._id,
          teamName, // ✅ Auto-generated team name
          projectName: request.projectName,
          teamMembers: request.teamMembers.map((member) => ({
              name: member.name || "Unknown",
              rollNo: member.rollNo || "N/A",
          })),
          description: request.description,
          mentorId: mentor.id,
          mentorName: mentor.name,
      });

      const response = await axios.post("http://localhost:5000/api/accepted-requests", {
          requestId: request._id,
          teamName, // ✅ Using generated team name
          projectName: request.projectName,
          teamMembers: request.teamMembers.map((member) => ({
              name: member.name || "Unknown",
              rollNo: member.rollNo || "N/A",
          })),
          description: request.description,
          mentorId: mentor.id,
          mentorName: mentor.name,
      }, {
          headers: { "Content-Type": "application/json" }
      });

      console.log("✅ Request Accepted:", response.data);
      // ✅ Pass the new accepted team to AcceptedTeamsSection
      // Update the parent state immediately
      onTeamAccepted(acceptedTeam);
      // ✅ Step 2: Delete from mentorrequests collection
    await axios.delete(`http://localhost:5000/api/mentor-requests/${request.projectName}`);
    console.log("🗑️ Request deleted from mentorrequests.");

      // setRequests((prevRequests) => prevRequests.filter((req) => req._id !== request._id));
      // 🔍 Refetch updated requests after acceptance
    await fetchRequests();
 // ✅ Immediately notify AcceptedTeamsSection to update
 if (props.onTeamAccepted) {
  props.onTeamAccepted(response.data.acceptedTeam);
}

  } catch (error) {
      console.error("❌ Request failed:", error.response ? error.response.data : error.message);
  }
};
// const handleReject = async (id) => {
//   console.log("❌ Rejecting request with ID:", id);
//   try {
//     const response = await fetch(`http://localhost:5000/api/mentor-requests/${id}`, {

//       method: "DELETE",
//       headers: { "Content-Type": "application/json" }, // Ensure correct headers
//     });

//     if (!response.ok) {
//       const errorText = await response.text(); // Read response as text
//       throw new Error(`Failed to reject request: ${errorText}`);    }

//     const data = await response.json(); // ✅ Ensure response is parsed
//     console.log("Request rejected:", data);

//     // ✅ Remove the rejected request from UI
//     setRequests(prevRequests => prevRequests.filter(req => req._id !== id));

//   } catch (error) {
//     console.error("Error rejecting request:", error);
//   }
// };
const handleReject = async (request) => {
  if (!request || !request.projectName) {
    console.error("❌ Missing request or projectName:", request);
    return;
  }
  console.log("❌ Rejecting request for project:", request.projectName);

  try {
    const response = await fetch(`http://localhost:5000/api/mentor-requests/${request.projectName}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" }, 
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to reject request: ${errorText}`);
    }

    const data = await response.json();
    console.log("✅ Request rejected:", data);

    // ✅ Remove the rejected request from the UI
    setRequests((prevRequests) => 
      prevRequests.filter((req) => req.projectName !== request.projectName)
    );

  } catch (error) {
    console.error("Error rejecting request:", error);
  }
};

const handleRevise = async (request) => {
  console.log("🔍 Full Request Object:", request);
  try {
    // 1️⃣ Send request data to the new "reviserequests" collection
    const response = await axios.post("http://localhost:5000/api/revised-requests", {
      projectName: request.projectName,
      teamMembers: request.teamMembers.map((member) => ({
        name: member.name || "Unknown",
        rollNo: member.rollNo || "N/A",
      })),
      description:request.description,
    }, {
      headers: { "Content-Type": "application/json" }
    });

    console.log("✅ Request moved to revise-requests:", response.data);
     // Show success toast notification
     toast.success("Revise request sent to student dashboard");
    // 2️⃣ Update UI to remove the request
    // setRequests(prevRequests => prevRequests.filter((req) => req._id !== request._id));
    // 🔍 Refetch updated requests from the database
    await fetchRequests();

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
            <p><strong>Team:</strong> {request.description}</p>
            <div className="request-buttons">

<button
  onClick={() => {
    console.log("Clicked Accept for:", request);

    if (!request) {
      console.error("❌ Missing required request fields:", request);
      return;
    }
    if (!request.projectName ) {
      console.error("❌ Missing required request projectname fields:", request);
      return;
    }
    if (!request.teamMembers) {
      console.error("❌ Missing required request member fields:", request);
      return;
    }
    handleAccept(request);
  }}
  className="accept-button"
>
  Accept
</button>
              <button onClick={() => handleReject(request)} className="reject-button">
                Reject
              </button>
              <button onClick={() => handleRevise(request)} className="revise-button">
                Revise
              </button>
              <div className="dropdown">
                <button className="more-button">More</button>
                <ul className="dropdown-list">
                    {Array.isArray(request.teamMembers) && request.teamMembers.length > 0 ? (
                      request.teamMembers.map((member) => (
                        <li key={member.rollNo || member.name}>
                          {member.name || "Unknown"} ({member.rollNo || "N/A"})
                        </li>
                      ))
                    ) : (
                      <li>No members available.</li>
                    )}
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