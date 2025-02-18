import express from "express";
import Team from "../models/AcceptedRequest.js"; // Ensure this path is correct

const router = express.Router();

// ✅ Route to accept a team and save it to the database
router.post("/accept", async (req, res) => {
  try {
    const { id, teamName, projectName, description, teamMembers ,acceptedAt} = req.body;

    if (!id || !teamName || !projectName) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Check if the team already exists in the accepted collection
    const existingTeam = await Team.findOne({ id });
    if (existingTeam) {
      return res.status(409).json({ error: "Team is already accepted" });
    }

    // Create a new accepted team entry
    const acceptedTeam = new Team({
      id,
      teamName,
      projectName,
      description,
      teamMembers,
      acceptedAt: new Date(), // ✅ Store the acceptance date
    });

    await acceptedTeam.save();
    res.status(201).json({ message: "Team accepted successfully", acceptedTeam });
  } catch (error) {
    console.error("❌ Error accepting team:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
// ✅ Define the route to fetch accepted teams
router.get("/", async (req, res) => {
  try {
    const acceptedTeams = await Team.find().sort(); // Sort by latest accepted first
    res.json(acceptedTeams);
  } catch (error) {
    console.error("❌ Error fetching accepted teams:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
export default router;
