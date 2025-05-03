import express from "express";
import { getJobs, createJob, updateJob, deleteJob, getJobById } from "../controllers/jobController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { getMyJobs } from '../controllers/jobController.js';

const router = express.Router();

router.get("/myjobs",protect,getMyJobs);
router.get("/", getJobs);
router.get("/:id",getJobById)

router.post("/", protect, createJob);
router.put("/:id", protect, updateJob);
router.delete("/:id", protect, deleteJob);

export default router;