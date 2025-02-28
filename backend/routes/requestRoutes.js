import express from "express";
import MentorRequest from "../models/MentorRequest.js"; // ✅ Corrected Model
import AcceptedRequest from "../models/AcceptedRequest.js";

const router = express.Router();

// ✅ Get all mentor requests
router.get("/mentor-requests", async (req, res) => {
  try {
    const requests = await MentorRequest.find({});
    console.log("Fetched Requests:", requests);

    res.json(requests.map(req => ({
      projectName: req.projectName,
      teamMembers: req.members, // ✅ Fixed field name
      description: req.projectDescription, // ✅ Fixed field name
    })));

  } catch (error) {
    console.error("Error fetching requests:", error);
    res.status(500).json({ message: "Error fetching requests", error });
  }
});
// ✅ Accept a request and move to AcceptedRequests collection
router.post("/accepted-requests", async (req, res) => {
  const { id } = req.body; // Extract the ID from the request body
  try {
    const requestId = id.trim(); // Ensure ID is correctly formatted

    // Check if the request exists
    const request = await MentorRequest.findById(requestId);
    if (!request) return res.status(404).json({ message: "Request not found" });

    // Move to AcceptedRequests collection
    const acceptedRequest = new AcceptedRequest({
      teamName: request.projectDescription,
      projectName: request.projectName,
      teamMembers: request.members,
      description: request.projectDescription,
      acceptedAt: new Date(),
    });

    await acceptedRequest.save(); // Save in AcceptedRequests
    // await MentorRequest.findByIdAndDelete(id); // Remove from requests

    res.status(200).json({ message: "Request accepted successfully", acceptedRequest });
  } catch (error) {
    console.error("Error in accepting request:", error);
    res.status(500).json({ message: "Error accepting request", error });
  }
});
// ✅ Route to delete a mentor request (Reject Request)
router.delete("/mentor-requests/:id", async (req, res) => {
  try {
    const requestId = req.params.id;

    // Check if the request exists before deleting
    const deletedRequest = await MentorRequest.findByIdAndDelete(requestId);

    if (!deletedRequest) {
      return res.status(404).json({ message: "Request not found" }); // ✅ Ensure JSON response
    }

    return res.status(200).json({ message: "Request rejected successfully" }); // ✅ Ensure JSON response
  } catch (error) {
    console.error("Error rejecting request:", error);
    return res.status(500).json({ message: "Error rejecting request", error }); // ✅ Ensure JSON response
  }
});

export default router; 