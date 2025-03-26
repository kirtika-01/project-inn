import mongoose from "mongoose";

const teamSchema = new mongoose.Schema({
  teamName: { type: String, required: true },
  project: { type: String, required: true },
  mentor: { type: mongoose.Schema.Types.ObjectId, ref: "Mentor" },
  teamSize: { type: Number, required: true },
  teamMembers: [
    {
      enrollmentNumber: { type: String, required: true },
      name: { type: String, required: true },
    },
  ],
});

const Team = mongoose.model("Team", teamSchema);
export default Team;
