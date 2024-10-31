import { NextFunction, Request, Response, Router } from "express";
import { StatusCode } from "../models/statusEnum";
import { ValidationError, NotFoundError, UnauthorizedError } from "../models/exceptions";
import {
    addVacation,
    editVacation,
    deleteVacation,
    getAllVacations,
    followVacation,
    unfollowVacation,
    getVacationReport,
    getVacationImage,
    getTotalVacationsCount
} from "../services/vacationService";
import { isAdmin, isLoggedIn } from "../middlewares/authMiddleware";
import { appConfig } from "../utils/appConfig";
import { UploadedFile } from "express-fileupload";
import * as path from 'path';
import * as fs from 'fs';

export const vacationRoutes = Router();

// Add a new vacation (Admin only)
vacationRoutes.post(appConfig.routePrefix + "/vacations", isLoggedIn, isAdmin, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const vacation = req.body;
        const image = req.files.image as UploadedFile;
        
        if (!image) {
            res.status(StatusCode.BadRequest).json({ message: "Image Missing!" });
            return
        }
        await addVacation(vacation, image);
        res.status(StatusCode.Created).json({ message: "Vacation added successfully!" });
    } catch (error) {
        if (error instanceof ValidationError) {
            res.status(error.status).json({ message: error.message });
        } else {
            next(error);
        }
    }
});

// Edit a vacation (Admin only)
vacationRoutes.put(appConfig.routePrefix + "/vacations/:vacationId", isLoggedIn, isAdmin, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const vacationId = parseInt(req.params.vacationId, 10);
        const vacation = req.body;
        vacation.vacationId = vacationId;
        
        const image = req.files?.image as UploadedFile;
        await editVacation(vacation, image);
        res.status(StatusCode.Ok).json({ message: "Vacation updated successfully!" });
    } catch (error) {
        if (error instanceof ValidationError || error instanceof NotFoundError) {
            res.status(error.status).json({ message: error.message });
        } else {
            next(error);
        }
    }
});

// Delete a vacation (Admin only)
vacationRoutes.delete(appConfig.routePrefix + "/vacations/:vacationId", isLoggedIn, isAdmin, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const vacationId = parseInt(req.params.vacationId, 10);
        await deleteVacation(vacationId);
        res.status(StatusCode.Ok).send("Vacation deleted successfully.");
    } catch (error) {
        if (error instanceof NotFoundError) {
            res.status(error.status).json({ message: error.message });
        } else {
            next(error);
        }
    }
});

// Get all vacations with optional filters (pagination, followed, upcoming, active)
vacationRoutes.get(appConfig.routePrefix + "/vacations", isLoggedIn, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.body.user.userId;
        const page = parseInt(req.query.page as string, 10) || 1;
        const limit = 10;
        const filters = {
            followed: req.query.followed === 'true',
            upcoming: req.query.upcoming === 'true',
            active: req.query.active === 'true',
            offset: (page - 1) * limit,
            limit: limit,
        };
        const vacations = await getAllVacations(userId, filters);
        const totalVacations = await getTotalVacationsCount(userId, filters);        
        
        res.status(StatusCode.Ok).json({
            vacations,
            totalPages: Math.ceil(totalVacations / limit)
        });
    } catch (error) {
        next(error);
    }
});

// Follow a vacation
vacationRoutes.post(appConfig.routePrefix + "/vacations/:vacationId/follow", isLoggedIn, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.body.user.userId; // Assuming you have middleware to extract user ID

        const vacationId = parseInt(req.params.vacationId, 10);
        await followVacation(userId, vacationId);
        res.status(StatusCode.Ok).json({ message: "Vacation followed successfully!" });
    } catch (error) {
        if (error instanceof NotFoundError) {
            res.status(error.status).json({ message: error.message });
        } else {
            next(error);
        }
    }
});

// Unfollow a vacation
vacationRoutes.delete(appConfig.routePrefix + "/vacations/:vacationId/unfollow", isLoggedIn, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.body.user.userId; // Assuming you have middleware to extract user ID
        const vacationId = parseInt(req.params.vacationId, 10);
        await unfollowVacation(userId, vacationId);
        res.status(StatusCode.Ok).json({ message: "Vacation unfollowed successfully!" });
    } catch (error) {
        if (error instanceof NotFoundError) {
            res.status(error.status).json({ message: error.message });
        } else {
            next(error);
        }
    }
});

// Get vacation report (Admin only)
vacationRoutes.get(appConfig.routePrefix + "/vacation/report", isLoggedIn, isAdmin, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const report = await getVacationReport();
        res.status(StatusCode.Ok).json(report);
    } catch (error) {
        next(error);
    }
});

vacationRoutes.get(appConfig.routePrefix + "/vacation/image/:vacationId", isLoggedIn, async (req: Request, res: Response, next: NextFunction) => {
    const vid = +req.params.vacationId;  // Use params instead of query
    try {
        const result = await getVacationImage(vid);
        if (result.length > 0) {
            const imageFileName = result[0].imageFileName;
            const imageUrl = `${appConfig.routePrefix}/assets/images/${imageFileName}`;
            res.status(200).json({ imageUrl });
        } else {
            res.status(404).json({ message: 'Vacation not found' });
        }
    } catch (error) {
        next(error);
    }
});

vacationRoutes.delete(appConfig.routePrefix + "/vacation/image/:vacationId", isLoggedIn, async (req: Request, res: Response, next: NextFunction) => {
    const vid = +req.params.vacationId;
    try {
        const result = await getVacationImage(vid);
        if (result.length > 0) {
            const imageFileName = result[0].imageFileName;
            const imagePath = path.join(appConfig.vacationsImagePrefix, imageFileName);
            fs.unlinkSync(imagePath); // Delete the old image from the disk
            res.status(200).json({ message: 'Image deleted successfully' });
        } else {
            res.status(404).json({ message: 'Vacation not found' });
        }
    } catch (error) {
        next(error);
    }
});