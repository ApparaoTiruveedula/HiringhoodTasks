import mongoose from "mongoose";
const applicationSchema = new mongoose.Schema({
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
  applicantId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  resumeLink: String,
  coverLetter: String,
  status: { type: String,enum: ["pending", "shortlisted", "selected", "rejected"], default: "pending" },
});


// Ensure a user can apply to a job only once
applicationSchema.index({ jobId: 1, applicantId: 1 }, { unique: true });
export default mongoose.model("Application", applicationSchema);