import { Router } from "express";
import {
  getUsers,
  createUser,
  findUserById,
  LoginUser,
  depositAmount,
  withdrawAmount,
} from "../controllers/user.controllers.js";

const router = Router();

router.get("/", getUsers);
router.post("/", createUser);
router.post("/login", LoginUser);
router.get("/:id", findUserById);
router.put("/update-my-amount", depositAmount);
router.put("/withdraw-amount", withdrawAmount);

export default router;
