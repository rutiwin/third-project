import { ResultSetHeader } from "mysql2";
import runQuery from "../db/dal";
import { ValidationError, NotFoundError, UnknownError } from "../models/exceptions";
import vacationModel from "../models/vacationModel";
import { UploadedFile } from "express-fileupload";
import { saveImage } from "../utils/helpers";
import path from "path";
import { appConfig } from "../utils/appConfig";
import fs from "fs";

// Add a new vacation (Admin only)
export async function addVacation(vacation: vacationModel, image: UploadedFile): Promise<void> {
    try {
        // Validation for price
        if (vacation.price < 0 || vacation.price > 10000) {
            throw new ValidationError("The price must be between 0 and 10,000.");
        }

        // Validation for start and end dates
        const currentDate = new Date();
        const startDate = new Date(vacation.startDate);
        const endDate = new Date(vacation.endDate);

        if (endDate < startDate) {
            throw new ValidationError("The end date cannot be earlier than the start date.");
        }

        if (startDate < currentDate) {
            throw new ValidationError("The start date cannot be in the past.");
        }

        const imageFileName = await saveImage(image);

        const insertQuery = `
            INSERT INTO vacation (destination, description, startDate, endDate, price, imageFileName)
            VALUES (?, ?, ?, ?, ?, ?)
        `;

        const result = await runQuery(insertQuery, [
            vacation.destination,
            vacation.description,
            vacation.startDate,
            vacation.endDate,
            vacation.price,
            imageFileName
        ]) as ResultSetHeader | any;

        if (result.affectedRows === 0) {
            throw new UnknownError("Failed to add the vacation.");
        }
    } catch (error) {
        throw new UnknownError(error);
    }
}

// Edit a vacation (Admin only)
export async function editVacation(vacation: vacationModel, image?: UploadedFile): Promise<void> {
    try {
        // Mandatory field validation
        if (!vacation.destination || !vacation.description || !vacation.startDate || !vacation.endDate || vacation.price === undefined || vacation.price === null) {
            throw new ValidationError("All fields except imageFileName are mandatory.");
        }

        // Price validation
        if (vacation.price < 0 || vacation.price > 10000) {
            throw new ValidationError("The price must be between 0 and 10,000.");
        }

        // Date validation
        const startDate = new Date(vacation.startDate);
        const endDate = new Date(vacation.endDate);

        if (endDate < startDate) {
            throw new ValidationError("The end date cannot be earlier than the start date.");
        }

        const existingImageFileName = await getVacationImage(vacation.vacationId);

        // Handle imageFileName: Keep the old image if no new image is provided
        let imageFileName: string | undefined;

        if (image) {
            // If a new image is provided, save it and use the new filename
            const oldImageFileName = existingImageFileName[0]?.imageFileName;
            imageFileName = await saveImage(image);

            // Delete the old image from disk
            if (oldImageFileName) {
                const oldImagePath = path.join(appConfig.vacationsImagePrefix, oldImageFileName);
                fs.unlinkSync(oldImagePath); // Synchronously delete the old image
            }
        } else {
            // If no new image is provided, keep the existing image
            imageFileName = existingImageFileName[0]?.imageFileName; // Use the existing image filename
        }

        const updateQuery = `
        UPDATE vacation 
        SET destination = ?, description = ?, startDate = ?, endDate = ?, price = ?, imageFileName = ?
        WHERE vacationId = ?
        `;

        const queryParams: any[] = [
            vacation.destination,
            vacation.description,
            vacation.startDate,
            vacation.endDate,
            vacation.price,
            imageFileName,
            vacation.vacationId
        ];

        const result = await runQuery(updateQuery, queryParams) as ResultSetHeader | any;

        if (result.affectedRows === 0) {
            throw new NotFoundError(`No vacation found for ID: ${vacation.vacationId}`);
        }
    } catch (error) {
        throw new UnknownError(error);
    }
}

// Delete a vacation (Admin only)
export async function deleteVacation(vacationId: number): Promise<void> {
    try {
        // Get the existing image filename before deleting the vacation
        const existingImage = await getVacationImage(vacationId);
        const imageFileName = existingImage[0]?.imageFileName;

        // First, delete any followers linked to this vacation
        const deleteFollowersQuery = `DELETE FROM follower WHERE vacationId = ?`;
        await runQuery(deleteFollowersQuery, [vacationId]);

        // Then delete the vacation itself
        const deleteVacationQuery = `DELETE FROM vacation WHERE vacationId = ?`;
        const result = await runQuery(deleteVacationQuery, [vacationId]) as ResultSetHeader | any;

        if (result.affectedRows === 0) {
            throw new NotFoundError(`No vacation found for ID: ${vacationId}`);
        }

        // Delete the image from disk if it exists
        if (imageFileName) {
            const imagePath = path.join(appConfig.vacationsImagePrefix, imageFileName);
            fs.unlinkSync(imagePath); // Synchronously delete the image
        }
    } catch (error) {
        throw new UnknownError(error);
    }
}

// Get all vacations (with optional filters for pagination, followed vacations, upcoming, and active vacations)
export async function getAllVacations(userId: number, filters: any): Promise<vacationModel[]> {
    try {
        let query = `
            SELECT v.*, COUNT(f.userId) as followersCount,
                   EXISTS(SELECT 1 FROM follower WHERE userId = ? AND vacationId = v.vacationId) as isFollowed
            FROM vacation v
            LEFT JOIN follower f ON v.vacationId = f.vacationId
            WHERE 1=1
        `;
        const queryParams: any[] = [userId];

        // Apply filter for followed vacations
        if (filters.followed) {
            query += ` AND EXISTS (SELECT 1 FROM follower WHERE userId = ? AND vacationId = v.vacationId)`;
            queryParams.push(userId);
        }

        // Apply filter for upcoming vacations
        if (filters.upcoming) {
            query += ` AND v.startDate > NOW()`;
        }

        // Apply filter for active vacations
        if (filters.active) {
            query += ` AND v.startDate <= NOW() AND v.endDate >= NOW()`;
        }

        query += ` GROUP BY v.vacationId ORDER BY v.startDate ASC LIMIT ?, ?`;
        queryParams.push(filters.offset || 0, filters.limit || 10);

        const result = await runQuery(query, queryParams);
        if (result.length === 0) {
            return []; // Instead of throwing an error
        }

        return result.map((v: any) => new vacationModel(
            v.vacationId,
            v.destination,
            v.description,
            v.startDate,
            v.endDate,
            v.price,
            v.imageFileName,
            v.followersCount,
            !!v.isFollowed
        ));
    } catch (error) {
        throw new UnknownError(error);
    }
}

// Follow a vacation
export async function followVacation(userId: number, vacationId: number): Promise<void> {
    try {
        const insertQuery = `INSERT INTO follower (userId, vacationId) VALUES (?, ?)`;
        const result = await runQuery(insertQuery, [userId, vacationId]) as ResultSetHeader | any;

        if (result.affectedRows === 0) {
            throw new UnknownError("Failed to follow vacation.");
        }
    } catch (error) {
        throw new UnknownError(error);
    }
}

// Unfollow a vacation
export async function unfollowVacation(userId: number, vacationId: number): Promise<void> {
    try {
        const deleteQuery = `DELETE FROM follower WHERE userId = ? AND vacationId = ?`;
        const result = await runQuery(deleteQuery, [userId, vacationId]) as ResultSetHeader | any;

        if (result.affectedRows === 0) {
            throw new NotFoundError(`No follow relationship found for user ID: ${userId} and vacation ID: ${vacationId}`);
        }
    } catch (error) {
        throw new UnknownError(error);
    }
}

// Get report data for vacations (Admin only)
export async function getVacationReport(): Promise<{ destination: string, followersCount: number }[]> {
    try {
        const query = `
            SELECT v.destination, COUNT(f.userId) as followersCount
            FROM vacation v
            LEFT JOIN follower f ON v.vacationId = f.vacationId
            GROUP BY v.vacationId
            ORDER BY followersCount DESC
        `;

        const result = await runQuery(query);


        if (result.length === 0) {
            throw new NotFoundError("No vacations or followers found.");
        }

        return result.map((r: any) => ({
            destination: r.destination,
            followersCount: r.followersCount
        }));
    } catch (error) {
        throw new UnknownError(error);
    }
}

export async function getVacationImage(vid: number){
    const q = `SELECT imageFileName FROM vacation WHERE vacationId=${vid};`;
    const res = await runQuery(q);
    return res;
}

export async function getTotalVacationsCount(userId: number, filters: any): Promise<number> {
    try {
        let query = `SELECT COUNT(DISTINCT v.vacationId) as count FROM vacation v LEFT JOIN follower f ON v.vacationId = f.vacationId WHERE 1=1`;
        const queryParams: any[] = [];

        if (filters.followed) {
            query += ` AND EXISTS (SELECT 1 FROM follower WHERE userId = ? AND vacationId = v.vacationId)`;
            queryParams.push(userId);
        }

        const result = await runQuery(query, queryParams);        
        return result[0].count;
    } catch (error) {
        throw new UnknownError(error);
    }
}