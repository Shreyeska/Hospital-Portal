import prisma from "../models/prismaClient.js";
import bcrypt from "bcryptjs";

const ADMIN_EMAILS = ["admin@example.com"];

function isAdmin(email) {
  return ADMIN_EMAILS.includes(email);
}

export async function createUser(req, res) {
  const {
    adminEmail,
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
  if (!isAdmin(adminEmail)) {
    return res.status(403).json({ error: "Access denied." });
  }

  // Basic validation
  if (!fullName || !email || !password || !role) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user in the database
    const newUser = await prisma.user.create({
      data: {
        fullName,
        email,
        password: hashedPassword,
        address,
        apptTime,
        doctorId,
        phoneNumber,
        gender,
        role,
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
      include: { assignedDoctor: true },
    });
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
}

export async function updateUser(req, res) {
  const id = Number(req.params.id);
  const { adminEmail, ...updates } = req.body; // extract adminEmail separately

  if (updates.apptTime) {
    updates.apptTime = new Date(updates.apptTime);
  }

  // Check if adminEmail is admin (you should add this check here)
  if (!(await isAdmin(adminEmail))) {
    return res.status(403).json({ error: "Access denied. Not an admin." });
  }

  try {
    const updatedUser = await prisma.user.update({
      where: { id },
      data: updates, // now adminEmail won't be here
    });
    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update user" });
  }
}

export async function deleteUser(req, res) {
  const id = Number(req.params.id);

  try {
    await prisma.user.delete({ where: { id } });
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete user" });
  }
}
