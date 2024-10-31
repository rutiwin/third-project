// src/custom.d.ts
import userModel from "../models/userModel";

declare global {
  namespace Express {
    interface Request {
      user?: userModel; // Add custom user property
    }
  }
}