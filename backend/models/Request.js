import mongoose from "mongoose";  // Change this line

const requestSchema = new mongoose.Schema({
  teamName: { type: String, required: true },
  projectName: { type: String, required: true },
  description: { type: String, required: true },
  teamMembers: { type: [String], required: true },
});

const Request = mongoose.model("Request", requestSchema);
export default Request;
