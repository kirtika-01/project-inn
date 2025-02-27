import express from "express";
import mongoose from "mongoose";
import MentorRequest from "../models/MentorRequest.js";
import AcceptedRequest from "../models/AcceptedRequests.js";

const router = express.Router();

// Fetch all mentor requests
router.get("/mentor-requests", async (req, res) => {
  try {
    const requests = await MentorRequest.find();
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: "Error fetching requests", error });
  }
});

// Accept a request and move it to acceptedrequests
router.post("/accepted-requests", async (req, res) => {
  try {
    const {projectName, projectDescription, members } = req.body;
     if (!projectName || !projectDescription) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Check if the request exists before processing
    const existingRequest = await MentorRequest.findById(_id);
    if (!existingRequest) {
      return res.status(404).json({ error: "Request not found" });
    }
     // ✅ Ensure the request isn't already accepted (prevent duplicates)
     const alreadyAccepted = await AcceptedRequest.findOne({ requestId: _id });
     if (alreadyAccepted) {
       return res.status(409).json({ error: "Request already accepted" });
     }
    // Transform data to match AcceptedRequest model
    const acceptedRequest = new AcceptedRequest({
      
      teamName: projectDescription, // Mapping projectDescription → teamName
      projectName,
      description: projectDescription,
      teamMembers: Array.isArray(members) ? members.map(member => member.name) : [], // Ensure safe mapping
      acceptedAt: new Date(), // Store acceptance date
    });

    await acceptedRequest.save(); // Save to acceptedrequests collection
    await MentorRequest.findByIdAndDelete(_id); // Remove from mentorrequests collection

    res.json({ message: "Request accepted successfully", acceptedRequest });
  } catch (error) {
    res.status(500).json({ message: "Error accepting request", error });
  }
});

export default router;