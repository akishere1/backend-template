import mongoose from "mongoose";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const healthcheck = asyncHandler(async (req, res) => {
  const isDbConnected = mongoose.connection.readyState === 1;

  const healthData = {
    uptime: process.uptime(),
    dbState: isDbConnected ? "connected" : "disconnected",
    timestamp: Date.now(),
  };

  return res
    .status(200)
    .json(new ApiResponse(200, healthData, "OK"));
});
