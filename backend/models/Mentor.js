import mongoose from "mongoose";

const MentorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  expertise: { type: String, required: true },
});

const Mentor = mongoose.model("Mentor", MentorSchema);
export default Mentor;