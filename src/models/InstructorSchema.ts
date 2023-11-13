import mongoose from "mongoose";

const instructorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  // Add any other relevant fields (e.g., contactNumber, bio, etc.)
});

const Instructor = mongoose.model("Instructor", instructorSchema);
export default Instructor;
