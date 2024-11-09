import { Router } from "express";
import {
  createTransaction,
  getUserTransactions,
} from "../controllers/transaction.controllers.js";

const router = Router();

router.post("/", createTransaction);

router.get("/:userId", getUserTransactions);

export default router;
