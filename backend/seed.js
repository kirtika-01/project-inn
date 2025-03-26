// import mongoose from "mongoose";
// import bcrypt from "bcryptjs";
// import dotenv from "dotenv";

// dotenv.config(); // Load environment variables

// // Connect to MongoDB
// mongoose
//   .connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("✅ MongoDB connected!"))
//   .catch((err) => console.error("❌ MongoDB connection failed:", err));

// // Define the User Schema
// const userSchema = new mongoose.Schema({
//   name: String,
//   email: String,
//   password: String,
//   role: String,
// });

// const User = mongoose.model("User", userSchema);

// // Seed Data
// const users = [
//   {
//     _id: new mongoose.Types.ObjectId("67851994fbb5cb2d417f1788"),
//     name: "Astha Shukla",
//     email: "asthashukla2244@gmail.com",
//     password: await bcrypt.hash("password123", 10), // Hashed password
//     role: "student",
//   },
//   {
//     _id: new mongoose.Types.ObjectId("67865e8d8d1f2c4499471604"),
//     name: "AANCHAL",
//     email: "aanchalkumawat39@gmail.com",
//     password: await bcrypt.hash("password456", 10),
//     role: "student",
//   },
//   {
//     _id: new mongoose.Types.ObjectId("67975ba5cbe610a883174503"),
//     name: "Dr. pushpa devi",
//     email: "pushpa@banasthali.in",
//     password: await bcrypt.hash("teacher789", 10),
//     role: "teacher",
//   },
//   {
//     _id: new mongoose.Types.ObjectId("67975c02cbe610a883174504"),
//     name: "Prof. Rajesh Sharma",
//     email: "rajeshsharma@banasthali.in",
//     password: await bcrypt.hash("coordinator101", 10),
//     role: "coordinator",
//   },
// ];

// // Function to seed the database
// const seedDatabase = async () => {
//   try {
//     await User.deleteMany({}); // Clear existing data
//     console.log("🗑️ Existing users removed.");

//     await User.insertMany(users);
//     console.log("🚀 Users seeded successfully.");

//     mongoose.connection.close(); // Close connection
//   } catch (error) {
//     console.error("❌ Error seeding data:", error);
//     mongoose.connection.close();
//   }
// };

// // Run the seed function
// seedDatabase();

// import mongoose from "mongoose";
// import MentorRequest from "./models/MentorRequest.js"; // Adjust path if needed

// // ✅ MongoDB connection URI (replace if needed)
// const mongoURI = "mongodb+srv://ProjectIn:ProjectIn@completeprojectin.dzhbj.mongodb.net/users?retryWrites=true&w=majority&tls=true";

// // 🚀 Connect to MongoDB
// mongoose
//   .connect(mongoURI)
//   .then(() => console.log("✅ MongoDB Connected"))
//   .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// // ✅ Existing mentors
// const mentors = [
//   {
//     _id: new mongoose.Types.ObjectId("67975ba5cbe610a883174503"),
//     name: "Pushpa Devi",
//   },
//   {
//     _id: new mongoose.Types.ObjectId("67975c02cbe610a883174504"),
//     name: "Prof. Ramesh Gupta",
//   },
// ];

// // ✅ Mentor request data
// const mentorRequests = [
//   {
//     projectName: "E-learning Platform",
//     isResearchBased: false,
//     projectDescription: "A web-based platform for online courses and training.",
//     technologyDetails: "React, Node.js, MongoDB",
//     members: [
//       { name: "Tanmay Sharma", rollNo: "BT123", _id: new mongoose.Types.ObjectId() },
//       { name: "Divya Rawat", rollNo: "BT124", _id: new mongoose.Types.ObjectId() },
//     ],
//     mentorName: mentors[0].name,
//     mentorId: mentors[0]._id,
//     leaderId: new mongoose.Types.ObjectId(),
//     status: "Pending",
//     createdAt: new Date(),
//   },
//   {
//     projectName: "AI Chatbot for Education",
//     isResearchBased: true,
//     projectDescription: "An AI-based chatbot to assist students in learning.",
//     technologyDetails: "Python, NLP, TensorFlow",
//     members: [
//       { name: "Riya Singh", rollNo: "BT125", _id: new mongoose.Types.ObjectId() },
//       { name: "Amit Kumar", rollNo: "BT126", _id: new mongoose.Types.ObjectId() },
//     ],
//     mentorName: mentors[0].name,
//     mentorId: mentors[0]._id,
//     leaderId: new mongoose.Types.ObjectId(),
//     status: "Pending",
//     createdAt: new Date(),
//   },
//   {
//     projectName: "Cloud-based File Storage",
//     isResearchBased: false,
//     projectDescription: "A scalable file storage system on the cloud.",
//     technologyDetails: "AWS, Node.js, MongoDB",
//     members: [
//       { name: "Sakshi Verma", rollNo: "BT127", _id: new mongoose.Types.ObjectId() },
//       { name: "Rajesh Mehta", rollNo: "BT128", _id: new mongoose.Types.ObjectId() },
//     ],
//     mentorName: mentors[1].name,
//     mentorId: mentors[1]._id,
//     leaderId: new mongoose.Types.ObjectId(),
//     status: "Pending",
//     createdAt: new Date(),
//   },
//   {
//     projectName: "IoT-based Smart Home",
//     isResearchBased: false,
//     projectDescription: "A smart home system for automation and security.",
//     technologyDetails: "IoT, Arduino, Node.js",
//     members: [
//       { name: "Kiran Joshi", rollNo: "BT129", _id: new mongoose.Types.ObjectId() },
//       { name: "Neha Tiwari", rollNo: "BT130", _id: new mongoose.Types.ObjectId() },
//     ],
//     mentorName: mentors[1].name,
//     mentorId: mentors[1]._id,
//     leaderId: new mongoose.Types.ObjectId(),
//     status: "Pending",
//     createdAt: new Date(),
//   },
//   {
//     projectName: "Sentiment Analysis Tool",
//     isResearchBased: true,
//     projectDescription: "A tool to analyze sentiments in social media posts.",
//     technologyDetails: "Python, NLP, MongoDB",
//     members: [
//       { name: "Manish Sharma", rollNo: "BT131", _id: new mongoose.Types.ObjectId() },
//       { name: "Ankita Agarwal", rollNo: "BT132", _id: new mongoose.Types.ObjectId() },
//     ],
//     mentorName: mentors[0].name,
//     mentorId: mentors[0]._id,
//     leaderId: new mongoose.Types.ObjectId(),
//     status: "Pending",
//     createdAt: new Date(),
//   },
//   {
//     projectName: "Blockchain Voting System",
//     isResearchBased: true,
//     projectDescription: "A secure and transparent voting system using blockchain.",
//     technologyDetails: "Blockchain, Solidity, Node.js",
//     members: [
//       { name: "Priya Sen", rollNo: "BT133", _id: new mongoose.Types.ObjectId() },
//       { name: "Aditya Roy", rollNo: "BT134", _id: new mongoose.Types.ObjectId() },
//     ],
//     mentorName: mentors[1].name,
//     mentorId: mentors[1]._id,
//     leaderId: new mongoose.Types.ObjectId(),
//     status: "Pending",
//     createdAt: new Date(),
//   },
// ];

// // 🔍 Seed function
// const seedData = async () => {
//   try {
//     // 🗑️ Clear previous data
//     await MentorRequest.deleteMany({});
//     console.log("🗑️ Previous mentor requests cleared.");

//     // 🚀 Insert new mentor requests
//     await MentorRequest.insertMany(mentorRequests);
//     console.log("✅ Mentor requests seeded successfully!");

//     // 🔌 Close DB connection
//     mongoose.connection.close();
//     console.log("🔌 MongoDB connection closed.");
//   } catch (err) {
//     console.error("❌ Error seeding data:", err);
//     mongoose.connection.close();
//   }
// };

// // 🏃 Run the function
// seedData();
import mongoose from "mongoose";
import dotenv from "dotenv";
import Panel from "./models/Panel.js"; // Import the Panel model

dotenv.config(); // Load environment variables

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Seed Data
const seedPanel = async () => {
  try {
    // Define the panel document to insert
    const panelRecord = {
      teacher_ids: [
        "67975ba5cbe610a883174503", // Example ObjectId for teachers
        "67f0ab34de56ac7890123456",
        "67f0ab78bc90de1234567890",
      ],
      team_ids: [
        "67e27848005ec2502ee9a0ff", // Example ObjectId for teams
        "67e2c735d22747ebcf2a5b7b",
        "67e2c988d22747ebcf2a5b8d",
      ],
      coordinator_id: "67c3df98bb4bb86485a98765", // Example ObjectId for coordinator
      createdAt: new Date(1743000000000), // 1743000000000 in milliseconds
      updatedAt: new Date(1743200000000),
    };

    // Delete existing records (optional)
    await Panel.deleteMany({});
    console.log("🗑️ Existing records removed.");

    // Insert new record
    const result = await Panel.create(panelRecord);
    console.log("✅ Panel record inserted:", result);

    // Close the connection
    mongoose.connection.close();
    console.log("🔒 Database connection closed.");
  } catch (error) {
    console.error("❌ Error seeding data:", error);
    mongoose.connection.close();
  }
};

// Call the seed function
seedPanel();
