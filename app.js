import express from "express";
import cors from "cors";
import registrationRoutes from "./routes/registration.routes.js";

const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

app.get("/api/health", (req, res) => {
  res.status(200).json({ success: true, message: "OK" });
});

app.use("/api", registrationRoutes);

export default app;