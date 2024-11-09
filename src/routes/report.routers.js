import express from "express";
import {
  createReport,
  getUserReports,
} from "../controllers/report.controllers.js";

const router = express.Router();

router.post("/reports", createReport);

router.get("/reports/:userId", getUserReports);

export default router;
