import express from "express";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getDoctors,
} from "../controllers/adminController.js";

const router = express.Router();

// router.post("/set-role", setRole);

router.post("/users", getUsers);
router.post("/doctors", getDoctors);
router.post("/create", createUser);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

// router.post("/doctors", getAllDoctors);
// router.post("/doctors/create", createDoctor);
// router.put("/doctors/:id", updateDoctor);
// router.delete("/doctors/:id", deleteDoctor);

export default router;
