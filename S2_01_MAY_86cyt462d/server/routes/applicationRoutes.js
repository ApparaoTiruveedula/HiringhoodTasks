import express from "express";
import { applyJob, getMyApplications, getJobApplicants, deleteApplication, updateApplicationStatus } from "../controllers/applicationController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { getJobById } from "../controllers/jobController.js";
const router = express.Router();
router.post("/", protect, applyJob);
router.get("/me", protect, getMyApplications);
router.patch("/:id", protect, updateApplicationStatus,getJobById);
router.get("/job/:id", protect, getJobApplicants,getJobById);
router.delete("/:id", protect, deleteApplication,getJobById);

export default router;
