import mongoose from "mongoose";

const teamLimitSchema = new mongoose.Schema({
  maxTeams: { type: Number, required: true },
  minMembers: { type: Number, required: true },
  maxMembers: { type: Number, required: true },
});

const TeamLimit = mongoose.model("TeamLimit", teamLimitSchema);
export default TeamLimit;
