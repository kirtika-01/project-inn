import express from "express";
import RevisedRequest from "../models/RevisedRequest.js";
import MentorRequest from "../models/MentorRequest.js";

const router = express.Router();

// POST request to store a revised request
router.post("/", async (req, res) => {
  try {
    const { requestId, projectName, teamMembers, description } = req.body;
    
    if (!projectName ) {
      return res.status(400).json({ message: "Missing required fields project name" });
    }
    if ( !teamMembers ) {
      return res.status(400).json({ message: "Missing required fields teammembers" });
    }
    if ( !description) {
      return res.status(400).json({ message: "Missing required fields description" });
    }
    // Create a new revised request entry
    const revisedRequest = new RevisedRequest({
      projectName,
      teamMembers,
      description
    });
    await revisedRequest.save();
    // Remove from mentorrequests collection after saving
    // await MentorRequest.findByIdAndDelete(requestId);

    // Remove from mentorrequests collection
    //await MentorRequest.findByIdAndDelete(requestId);
   // Remove from mentorrequests collection based on projectName
   const deletedRequest = await MentorRequest.findOneAndDelete({ projectName });
   if (!deletedRequest) {
    return res.status(404).json({ message: "No matching request found to delete." });
  }
    res.status(201).json({ message: "Request moved to revise-requests successfully!" });
  } catch (error) {
    console.error("Error moving request to revise-requests:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
