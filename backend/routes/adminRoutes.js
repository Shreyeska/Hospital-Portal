import express from "express";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getDoctors,
} from "../controllers/adminController.js";

const router = express.Router();


router.post("/users", getUsers);
router.post("/doctors", getDoctors);
router.post("/create", createUser);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);



export default router;
