import prisma from "../models/prismaClient.js";
import bcrypt from "bcryptjs";

function isAdmin(role) {
  return typeof role === "string" && role.toUpperCase() === "ADMIN";
}

export async function createUser(req, res) {
  const {
    requestBy,
    fullName,
    email,
    password,
    address,
    apptTime,
    doctorId,
    phoneNumber,
    gender,
    role,
  } = req.body;

  // Check if the request is made by an admin
  if (!isAdmin(requestBy)) {
    return res.status(403).json({ error: "Access denied." });
  }

  if (!fullName || !email || !password || !role) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        fullName,
        email,
        password: hashedPassword,
        address,
        apptTime: apptTime ? new Date(apptTime) : null,
        doctorId,
        phoneNumber,
        gender,
        role: "USER",
      },
    });

    const { password: _, ...userWithoutPassword } = newUser;

    res.status(201).json({
      message: "User created successfully",
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error("Create user error:", error);

    if (error.code === "P2002") {
      return res.status(400).json({ error: "Email already exists" });
    }

    res.status(500).json({ error: "Failed to create user" });
  }
}

export async function getUsers(req, res) {
  try {
    const users = await prisma.user.findMany({
      where: { role: { not: "ADMIN" } }, // exclude admins
      include: { assignedDoctor: true },
    });
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
}

export async function getDoctors(req, res) {
  try {
    const doctors = await prisma.doctor.findMany();
    res.json(doctors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch doctors" });
  }
}

export async function updateUser(req, res) {
  const id = Number(req.params.id);
  const { requestBy, ...updates } = req.body;

  if (!isAdmin(requestBy)) {
    return res.status(403).json({ error: "Access denied. Not an admin." });
  }

  try {
    if (updates.apptTime) {
      updates.apptTime = new Date(updates.apptTime);
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: updates,
    });

    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update user" });
  }
}

export async function deleteUser(req, res) {
  const id = Number(req.params.id);
  const { requestBy } = req.body;

  if (!isAdmin(requestBy)) {
    return res.status(403).json({ error: "Access denied. Not an admin." });
  }

  try {
    await prisma.user.delete({ where: { id } });
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete user" });
  }
}
