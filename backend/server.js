import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import requestRoutes from "./routes/requestRoutes.js"; // Ensure the .js extension is included
import acceptedTeamsRoutes from "./routes/acceptedTeamsRoutes.js"; // Add this import
import MentorRequest from "./models/MentorRequest.js"; // ✅ Import MentorRequest model
import AcceptedTeam from "./models/AcceptedRequest.js"; // ✅ Import AcceptedTeam model

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Required for form data
app.use("/api/requests", requestRoutes);
app.use("/api/accepted-requests", acceptedTeamsRoutes); // ✅ Add this line

// ✅ ADD THIS ROUTE JUST BEFORE app.listen
app.get("/api/mentor-requests", async (req, res) => {
  try {
    const mentorRequests = await MentorRequest.find(); // Ensure the model is correct
    res.json(mentorRequests);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});



app.post("/api/accepted-requests", async (req, res) => {
  console.log("📥 Received data:", req.body); // Debugging step
  
  const {teamName, projectName, teamMembers, description } = req.body;

  if (!teamName || !projectName || !teamMembers || !description) {
    return res.status(400).json({ error: "Missing required fields", received: req.body });
  }

  try {
    const newAcceptedTeam = new AcceptedTeam({
      teamName,
      projectName,
      teamMembers,
      description
    });

    await newAcceptedTeam.save();
    res.status(201).json(newAcceptedTeam);
  } catch (error) {
    console.error("❌ Backend Error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
const PORT = process.env.PORT || 5000;

const connectDB = async () => {
  try {
    console.log("🛠️ Connecting to MongoDB...");
    if (!process.env.MONGO_URI) throw new Error("❌ MONGO_URI missing from .env");

    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
    process.exit(1); // Exit on failure
  }
};

// ✅ CONNECT TO DB FIRST, THEN START SERVER
connectDB().then(() => {
  app.listen(PORT, () => console.log("🚀 Server running on port ${PORT}"));
});