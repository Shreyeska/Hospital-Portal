import express from "express";
import {
  setRole,
  getAllUsers,
  getAllDoctors,
  deleteUser,
} from "../controllers/adminController.js";

const router = express.Router();

router.post("/set-role", setRole);
router.post("/users", getAllUsers);
router.post("/doctors", getAllDoctors);
router.delete("/delete-user", deleteUser);

export default router;
