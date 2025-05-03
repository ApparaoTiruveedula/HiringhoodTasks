import mongoose from "mongoose";
const profileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  bio: String,
  skills: [String],
  resumeLink: String,
  experience: String,
});
export default mongoose.model("Profile", profileSchema);