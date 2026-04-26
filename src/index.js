import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";
import mongoose from "mongoose";
import { logger } from "./utils/logger.js";

// DO NOT USE THIS, let env.js handle config parsing and throw error early if invalid
// We are still calling config() to populate process.env, but the validation is handled internally.
dotenv.config({
  path: "./.env",
});

connectDB()
  .then(() => {
    const server = app.listen(process.env.PORT || 8000, () => {
      logger.info(`⚙️ Server is running at port : ${process.env.PORT}`);
    });

    // Graceful Shutdown implementation
    const gracefulShutdown = () => {
      logger.info("SIGINT/SIGTERM received. Shutting down gracefully...");
      server.close(() => {
        logger.info("HTTP server closed.");
        mongoose.connection.close(false, () => {
          logger.info("MongoDB connection closed.");
          process.exit(0);
        });
      });
    };

    process.on("SIGINT", gracefulShutdown);
    process.on("SIGTERM", gracefulShutdown);
  })
  .catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
  });