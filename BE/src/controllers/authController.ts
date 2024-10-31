import { NextFunction, Request, Response, Router } from "express";
import { StatusCode } from "../models/statusEnum";
import { ValidationError, NotFoundError, UnauthorizedError } from "../models/exceptions";
import { registerUser, loginUser } from "../services/authService";
import userModel from "../models/userModel";
import { isAdmin, isLoggedIn } from "../middlewares/authMiddleware";
import { appConfig } from "../utils/appConfig";

export const authRoutes = Router();

// Register a new user
authRoutes.post(appConfig.routePrefix + "/auth/register", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { firstName, lastName, email, password, isAdmin = false } = req.body;
        const user = new userModel(firstName, lastName, email, password, isAdmin);
        const token = await registerUser(user);
        res.status(StatusCode.Created).json({ token });
    } catch (error) {
        if (error instanceof ValidationError) {
            res.status(error.status).json({ message: error.message });
        } else {
            next(error);
        }
    }
});

// User login
authRoutes.post(appConfig.routePrefix + "/auth/login", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        const { user, token } = await loginUser(email, password);
        res.status(StatusCode.Ok).json({ user, token });
    } catch (error) {
        if (error instanceof NotFoundError || error instanceof ValidationError) {
            res.status(error.status).json({ message: error.message });
        } else {
            next(error);
        }
    }
});