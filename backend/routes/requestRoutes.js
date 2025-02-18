import express from "express";
import Request from "../models/Request.js";
import AcceptedRequest from "../models/AcceptedRequest.js";

const router = express.Router();

// ✅ Get all requests
router.get("/", async (req, res) => {
  try {
    const requests = await Request.find({});
    console.log("Fetched Requests:", requests); // Log the requests to verify structure
    res.json(requests.map(req => ({
      id: req._id, // ✅ Ensure ID is sent
      teamName: req.teamName,
      projectName: req.projectName,
      description: req.description,
      teamMembers: req.teamMembers,
    })));
    res.json(requests);
  } catch (error) {
    res.status(200).json({ message: "Error fetching requests", error });
  }
});

// ✅ Accept a request and move to AcceptedRequests collection
router.post("/accept", async (req, res) => {
  const { id } = req.body; // Extract the ID from the request body
  try {
    const requestId = req.params.id.trim(); // Ensure ID is correctly formatted

    // Check if the request exists
    const request = await Request.findById(requestId);
    if (!request) return res.status(404).json({ message: "Request not found" });

    // Move to AcceptedRequests collection
    const acceptedRequest = new AcceptedRequest({
      teamName: request.teamName,
      projectName: request.projectName,
      description: request.description,
      teamMembers: request.teamMembers,
      acceptedAt: new Date(),
    });

    await acceptedRequest.save(); // Save in AcceptedRequests
    await Request.findByIdAndDelete(req.params.id); // Remove from requests

    res.status(200).json({ message: "Request accepted successfully", acceptedRequest });
  } catch (error) {
    console.error("Error in accepting request:", error);
    res.status(500).json({ message: "Error accepting request", error });
  }
});


export default router; // ✅ Use ES module export
