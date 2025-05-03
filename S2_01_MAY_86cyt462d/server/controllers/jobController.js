import Job from "../models/Job.js";
import mongoose from "mongoose";
import Application from "../models/Application.js";
export const getJobs = async (req, res) => {
  const jobs = await Job.find()
  .populate('employerId', 'fullName');
  res.status(200).json(jobs);
};
export const getJobById = async (req, res) => {
  // try {
  //   const job = await Job.findById(req.params.id)
  //   .populate('employerId', 'fullName');
  //   if (!job) return res.status(404).json({ message: "Job not found" });
  //   res.status(200).json(job);
  // } catch (error) {
  //   res.status(500).json({ message: "Failed to fetch job", error });
  // }




    try {
      const job = await Job.findById(req.params.id)
        .populate('employerId', 'fullName');
      
      if (!job) return res.status(404).json({ message: "Job not found" });
  
      const applications = await Application.find({ jobId: job._id }).populate('applicantId', 'fullName email').lean();

        console.log(applications)
  
        res.status(200).json({job,applicants:applications,});
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch job", error });
    }
  
};

export const getMyJobs = async (req, res) => {
  // try {
  //   const jobs = await Job.find({ employerId: req.user.id }).populate('employerId', 'fullName');
  //   res.status(200).json(jobs);
  // } catch (error) {
  //   res.status(500).json({ message: "Failed to fetch your jobs", error });
  // }
  try {
    const jobs = await Job.find({ employerId: req.user.id }).populate('employerId', 'fullName');
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch jobs", error });
  }
};

export const createJob = async (req, res) => {
  console.log(req.body)
  const job = await Job.create({ ...req.body, employerId: req.user.id });
  res.status(201).json(job);
};
export const updateJob = async (req, res) => {
  const job = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.status(200).json(job);
};
export const deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    const newObjId = new mongoose.Types.ObjectId(req.user.id);
console.log(newObjId.equals(job.employerId));
    // if (!newObjId.equals(job.employerId)) {
    //   return res.status(401).json({ message: "Not authorized to delete this job" });
    // }

    await job.deleteOne(); //  Triggers cascading delete!

    res.status(200).json({ message: "Job and associated applications deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};