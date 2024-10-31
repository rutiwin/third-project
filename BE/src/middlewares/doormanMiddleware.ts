import { NextFunction, Request, Response } from "express";
import { appConfig } from "../utils/appConfig";
import { UnauthorizedError } from "../models/exceptions";

export function doorman(req: Request, res: Response, next: NextFunction): void {
    if (req.header('doormanKey') !== appConfig.doormanKey) {
        next(new UnauthorizedError("DBG: doorman"));
    }
    next();
}