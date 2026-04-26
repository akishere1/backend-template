import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import mongoSanitize from "express-mongo-sanitize";

import { logger } from "./utils/logger.js";

const app = express();

// Security Middlewares
app.use(helmet());
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
    standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  })
);
app.use(mongoSanitize());

// Logging Middleware
const morganFormat = process.env.NODE_ENV === "production" ? "combined" : "dev";
app.use(
  morgan(morganFormat, {
    stream: {
      write: (message) => logger.info(message.trim()),
    },
  })
);

// Standard Middlewares
app.use(cors({
    origin: process.env.CORS_ORIGIN || "*",
    credentials: true
}));

app.use(express.json({limit: "16kb"}));
app.use(express.urlencoded({extended: true, limit: "16kb"}));
app.use(express.static("public"));
app.use(cookieParser());


import { errorHandler } from "./middlewares/error.middleware.js";

// routes import
import healthcheckRouter from "./routes/healthcheck.routes.js";

// routes declaration
app.use("/api/v1/healthcheck", healthcheckRouter);

// Error Handling Middleware (should be the last middleware)
app.use(errorHandler);

export { app };