import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UnauthorizedError } from "../models/exceptions";
import { appConfig } from "../utils/appConfig";

// Middleware to check if the user is authenticated
export function isLoggedIn(req: Request, res: Response, next: NextFunction): void {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        throw new UnauthorizedError("Authentication token is missing.");
    }

    try {
        // const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
        const decoded = jwt.verify(token, appConfig.jwtSecret);

        req.body.user = decoded; // Pass user data through req.body
        
        next();
    } catch (error) {
        throw new UnauthorizedError("Invalid or expired token.");
    }
}

// Middleware to check if the user is an admin
export function isAdmin(req: Request, res: Response, next: NextFunction): void {

    const user = req.body.user; // Access the user data from req.body

    if (!user?.isAdmin) {
        throw new UnauthorizedError("Admin privileges are required.");
    }
    next();
}