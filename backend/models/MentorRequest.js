import mongoose from "mongoose";

const MentorRequestSchema = new mongoose.Schema({
    projectName: { type: String, required: true },
    isResearchBased: { type: Boolean, required: true },
    projectDescription: { type: String, required: true },
    technologyDetails: { type: String, required: true },
    members: [
        {
            name: { type: String, required: true }
        }
    ],
    mentorName: { type: String, required: true },
    leaderId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" }, // ✅ Added ref
    status: { type: String, enum: ["Pending", "Accepted", "Rejected"], default: "Pending" }, // ✅ Added enum for safety
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("MentorRequest", MentorRequestSchema);