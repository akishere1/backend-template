import mongoose from "mongoose";
import { ApiError } from "../utils/ApiError.js";
import { logger } from "../utils/logger.js";
import { env } from "../config/env.js";

/**
 * Global error handling middleware
 */
export const errorHandler = (err, req, res, next) => {
  let error = err;

  // If the error is not an instance of our ApiError, convert it
  if (!(error instanceof ApiError)) {
    const statusCode =
      error.statusCode || error instanceof mongoose.Error ? 400 : 500;
    const message = error.message || "Something went wrong";
    error = new ApiError(statusCode, message, error?.errors || [], err.stack);
  }

  // Log the error
  logger.error(
    `${error.statusCode} - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`
  );

  const response = {
    ...error,
    message: error.message,
    ...(env.NODE_ENV === "development" ? { stack: error.stack } : {}),
  };

  return res.status(error.statusCode).json(response);
};
