import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import requestRoutes from "./routes/requestRoutes.js"; // Ensure the `.js` extension is included
import acceptedTeamsRoutes from "./routes/acceptedTeamsRoutes.js"; // Add this import

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/requests", requestRoutes);
app.use("/api/acceptedTeams", acceptedTeamsRoutes); // ✅ Add this line

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
    setTimeout(connectDB, 5000);
  }
};

connectDB().then(() => {
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
});
