import mongoose from "mongoose";

const marks2Schema = new mongoose.Schema({
  rollNo: {
    type: String,
    required: true,
    unique: true,
  },
  teamId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Team",
    required: true,
  },
  evalMarks1: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
  evalMarks2: {
    type: Number,
    min: 0,
    max: 100,
    validate: {
      validator: function (value) {
        return this.evalMarks1 !== undefined;
      },
      message: "EvalMarks2 cannot be entered until EvalMarks1 is submitted.",
    },
  },
  evaluatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Explicitly naming the collection as "marks2"
const marks2 = mongoose.model("marks2", marks2Schema, "marks2");

export default marks2;
