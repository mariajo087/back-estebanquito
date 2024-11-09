import { Router } from "express";
import {
  createLoan,
  getUserLoans,
  payLoan,
} from "../controllers/loan.controllers.js";

const router = Router();

router.post("/", createLoan);

router.get("/:userId", getUserLoans);

router.put("/", payLoan);

export default router;
