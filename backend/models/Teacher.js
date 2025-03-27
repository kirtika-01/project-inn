import mongoose from "mongoose";
import bcrypt from "bcryptjs";


const teacherSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
});


export default mongoose.model("Teacher", teacherSchema);
