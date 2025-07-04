import prisma from "../models/prismaClient.js";

const ADMIN_EMAILS = ["admin@example.com"];

export async function setRole(req, res) {
  const { adminEmail, targetEmail, role } = req.body;

  if (!["USER", "DOCTOR"].includes(role)) {
    return res.status(400).json({ error: "Role must be USER or DOCTOR" });
  }

  if (!isAdmin(adminEmail)) {
    return res.status(403).json({ error: "Access denied. Not an admin." });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: targetEmail },
    });
    if (!user) return res.status(404).json({ error: "Target user not found" });

    // Update the role first
    const updatedUser = await prisma.user.update({
      where: { email: targetEmail },
      data: { role },
    });

    // If role is DOCTOR, check/create Doctor entry
    if (role === "DOCTOR") {
      const existingDoctor = await prisma.doctor.findFirst({
        where: { users: { some: { email: targetEmail } } },
      });

      if (!existingDoctor) {
        await prisma.doctor.create({
          data: {
            name: user.fullName,
            department: "General", // Default — change as needed
            specialization: "General", // Default — change as needed
            users: { connect: { id: user.id } },
          },
        });
      }
    }

    return res.json({
      message: `Role updated to ${role} for ${targetEmail}`,
      user: {
        id: updatedUser.id,
        email: updatedUser.email,
        role: updatedUser.role,
      },
    });
  } catch (error) {
    console.error("Set role error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

function isAdmin(email) {
  const ADMIN_EMAILS = ["admin@example.com"];
  return ADMIN_EMAILS.includes(email);
}

export async function getAllUsers(req, res) {
  const { adminEmail } = req.body;
  if (!isAdmin(adminEmail))
    return res.status(403).json({ error: "Access denied. Not an admin." });

  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        fullName: true,
        email: true,
        role: true,
        gender: true,
        phoneNumber: true,
        address: true,
        apptTime: true,
      },
    });
    res.json({ users });
  } catch (error) {
    console.error("Get users error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// Get all doctors
export async function getAllDoctors(req, res) {
  const { adminEmail } = req.body;
  if (!isAdmin(adminEmail))
    return res.status(403).json({ error: "Access denied. Not an admin." });

  try {
    const doctors = await prisma.doctor.findMany({
      include: { users: true },
    });
    res.json({ doctors });
  } catch (error) {
    console.error("Get doctors error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// Delete a user
export async function deleteUser(req, res) {
  const { adminEmail, targetEmail } = req.body;
  if (!isAdmin(adminEmail))
    return res.status(403).json({ error: "Access denied. Not an admin." });

  try {
    const deleted = await prisma.user.delete({ where: { email: targetEmail } });
    res.json({ message: `User ${targetEmail} deleted.` });
  } catch (error) {
    console.error("Delete user error:", error);
    res.status(500).json({ error: "User not found or internal error" });
  }
}
