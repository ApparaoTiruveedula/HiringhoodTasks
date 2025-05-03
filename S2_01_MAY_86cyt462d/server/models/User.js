import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["jobseeker", "employer"], default: "jobseeker" },
});
export default mongoose.model("User", userSchema);