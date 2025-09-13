import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./db/index.js";
import { validateEnvironmentVariables, logConfiguration } from "./utils/env-validation.js";

dotenv.config({
  path: "./.env",
});

// Validate environment variables before starting the server
validateEnvironmentVariables();

const port = process.env.PORT || 3000;

connectDB()
  .then(() => {
    // Log configuration after successful DB connection
    logConfiguration();
    
    app.listen(port, () => {
      console.log(`🎉 Server is running on port http://localhost:${port}`);
      console.log(`📚 API Documentation: http://localhost:${port}/api/v1/healthcheck`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });
