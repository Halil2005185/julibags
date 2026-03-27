import dotenv from "dotenv";
dotenv.config();
import express from "express";
import adminProxy from "./routes/adminProxy.js";
import cors from "cors";

const app = express();
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use("/api/admin", adminProxy);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
