import mongoose from "mongoose";

// Define member schema with roll number


const MentorRequestSchema = new mongoose.Schema({
    projectName: { type: String, required: true },
    isResearchBased: { type: Boolean, required: true },
    projectDescription: { type: String, required: true },
    technologyDetails: { type: String, required: true },
    members: [{
        name: { type: String, required: true },
        rollNo: { type: String, required: true },
    }], 
    mentorName: { type: String, required: true },
    mentorId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Mentor" }, // ✅ Added mentorId with reference
    leaderId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" }, // ✅ Reference to User
    status: { type: String, enum: ["Pending", "Accepted", "Rejected"], default: "Pending" }, // ✅ Enum for safety
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("MentorRequest", MentorRequestSchema);
