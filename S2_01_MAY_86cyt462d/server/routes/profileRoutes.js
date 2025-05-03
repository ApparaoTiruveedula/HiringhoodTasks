import express from "express";
import { getProfile, updateProfile } from "../controllers/profileController.js";
import { protect } from "../middlewares/authMiddleware.js";
const router = express.Router();
router.get("/me", protect, getProfile);
router.put("/", protect, updateProfile);
export default router;