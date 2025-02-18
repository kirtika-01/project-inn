import mongoose from "mongoose";  // Change this line

const acceptedRequestSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true }, // ✅ Added ID field
  teamName: { type: String, required: true },
  projectName: { type: String, required: true },
  description: { type: String, required: true },
  teamMembers: { type: [String], required: true },
  acceptedAt: { type: Date, default: Date.now },
});

const AcceptedRequest = mongoose.model("AcceptedRequest", acceptedRequestSchema);
export default AcceptedRequest;
