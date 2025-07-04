import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import cors from "cors";

const app = express();
dotenv.config();

app.use(
  cors({
    origin: process.env.FRONT_URL,
  })
);

app.use(express.json());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/admin", adminRoutes);
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server started on PORT: ${port}`);
});
