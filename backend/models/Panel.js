import mongoose from "mongoose";

// Define the Panel schema
const panelSchema = new mongoose.Schema(
  {
    teacher_ids: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Mentor", // Reference to the Mentor collection
        required: true,
      },
    ],
    team_ids: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Team", // Reference to the Team collection
        required: true,
      },
    ],
    coordinator_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User collection for coordinator
      required: true,
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Export the model
const Panel = mongoose.model("Panel", panelSchema);
export default Panel;
