import express from "express";
import AcceptedTeam from "../models/AcceptedRequest.js"; // Ensure correct model
import MentorRequest from "../models/MentorRequest.js";

const router = express.Router();

// ✅ Route to accept a team and save it to the database
router.post("/accepted-requests", async (req, res) => {
  try {
    const {teamName, projectName, description, teamMembers} = req.body;

    if (!teamName || !projectName) {
      return res.status(400).json({ error: "Missing required fields" });
    }
 // Ensure requestId is a valid ObjectId
 if (!mongoose.Types.ObjectId.isValid(requestId)) {
  return res.status(400).json({ error: "Invalid request ID format" });
}
    // Check if the team already exists in the accepted collection
    const existingTeam = await AcceptedTeam.findOne({ requestId });
    if (existingTeam) {
      return res.status(409).json({ error: "Team is already accepted" });
    }

    // Create a new accepted team entry
    const acceptedTeam = new AcceptedTeam({
      teamName,
      projectName,
      description,
      teamMembers: teamMembers || [],
      acceptedAt: new Date(), // ✅ Store the acceptance date
    });

    await acceptedTeam.save();
    const mentorRequest = await MentorRequest.findById(requestId); // Remove from mentor requests
    if (mentorRequest) {
      await MentorRequest.findByIdAndDelete(requestId); // Remove from mentor requests
    }

    res.status(201).json({ message: "Team accepted successfully", acceptedTeam });
  } catch (error) {
    console.error("❌ Error accepting team:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
// ✅ Define the route to fetch accepted teams
router.get("/", async (req, res) => {
  try {
    const acceptedTeams = await AcceptedTeam.find().sort({ acceptedAt: -1 }); // Sort by latest accepted first
    res.json(acceptedTeams);
  } catch (error) {
    console.error("❌ Error fetching accepted teams:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
export default router;
