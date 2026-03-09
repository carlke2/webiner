import "dotenv/config";
import app from "./app.js";
import connectDB from "./config/db.js";

console.log("ENV TEST:", {
  RESEND_API_KEY: process.env.RESEND_API_KEY ? "loaded" : "missing",
  MONGODB_URI: process.env.MONGODB_URI ? "loaded" : "missing",
  FROM_EMAIL: process.env.FROM_EMAIL ? "loaded" : "missing",
});

const PORT = process.env.PORT || 10000; // Render default port

async function startServer() {
  try {
    await connectDB();

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error("Server startup failed:", error);
    process.exit(1);
  }
}

startServer();