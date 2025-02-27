// import mongoose from "mongoose";  // Change this line

// const acceptedRequestSchema = new mongoose.Schema({
//   requestId: { type: String, required: true },
//   teamName: { type: String, required: true },
//   projectName: { type: String, required: true },
//   teamMembers: [
//     {
//       name: { type: String, required: true },
//       rollno: { type: String, required: true },
//     },
//   ],
//   description: { type: String, required: true }, // Ensure this is present
// });

// const AcceptedRequest = mongoose.model("AcceptedRequest", acceptedRequestSchema);
// export default AcceptedRequest;
import mongoose from "mongoose";

const acceptedRequestSchema = new mongoose.Schema({
   //requestId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "MentorRequest" },
  teamName: { type: String, required: true },
  projectName: { type: String, required: true },
  teamMembers: [
    {
      name: { type: String, required: true },
      rollno: { type: String},
    },
  ],
  description: { type: String, required: true },
}, { timestamps: true }); // ✅ Added timestamps for createdAt & updatedAt

const AcceptedRequest = mongoose.model("AcceptedRequest", acceptedRequestSchema);
export default AcceptedRequest;
