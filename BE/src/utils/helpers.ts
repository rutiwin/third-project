import { UploadedFile } from "express-fileupload";
import runQuery from "../db/dal";
import path from "path";
import { appConfig } from "./appConfig";
import { v4 as uuid } from "uuid";
import { promises as fs } from "fs";

export async function isDbServerUp() {
    try {
        await runQuery("SELECT 1;");
        return true;
    } catch (error) {
        return false;
    }
}

export async function saveImage(image: UploadedFile) {
    const extension = image.name.substring(image.name.lastIndexOf("."))
    const filename = uuid() + extension;
    const fullPath = path.join(appConfig.vacationsImagePrefix, filename);
    await image.mv(fullPath);
    return filename;
}

export async function deleteImage(image: string) {
        const fullPath = path.join(appConfig.vacationsImagePrefix, image);

        try {
            // מחיקת הקובץ מהנתיב המלא
            await fs.unlink(fullPath);
            console.log(`Image ${image} deleted successfully.`);
        } catch (error) {
            console.error(`Failed to delete image ${image}:`, error);
        }
}