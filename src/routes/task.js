import express from "express";
import { createTask, getTasks } from "../controllers/taskContoller.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createTask);
router.get("/", getTasks);

export default router;
