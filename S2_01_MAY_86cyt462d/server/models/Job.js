import mongoose from "mongoose";
import Application from "./Application.js"; //  Important: import Application model

const jobSchema = new mongoose.Schema({
  employerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: String,
  description: String,
  location: String,
  company: String,
});

//  Cascading Delete Middleware
jobSchema.pre('remove', async function (next) {
  try {
    console.log(`Deleting applications related to Job ID: ${this._id}`);
    await Application.deleteMany({ jobId: this._id }); // delete all Applications related to the Job
    next();
  } catch (error) {
    next(error);
  }
});

export default mongoose.model("Job", jobSchema);
