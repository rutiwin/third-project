import dotenv from "dotenv"
import path from "path";

// load environment variables
dotenv.config()

class BaseAppConfig {
    readonly routePrefix = "/api/v1";
    readonly doormanKey = process.env.DOORMAN_KEY;
    readonly jwtSecret = process.env.JWT_SECRET;
}

class DevAppConfig extends BaseAppConfig {
    readonly port: number = 4700;
    readonly vacationsImagePrefix: string = path.join(__dirname, "..", "assets", "images");
    readonly dbConfig = {
        host: 'localhost',
        port: 3306,
        database: 'vacations',
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD
    }
}

class ProdAppConfig extends BaseAppConfig {
    readonly port: number = 443;
    readonly vacationsImagePrefix: string = "";
    readonly dbConfig = {
        host: 'aws://db:/localZone-use123123',
        port: 3306,
        database: 'vacations_prod',
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD
    }
}


export const appConfig = process.env.IS_PRODUCTION === "true"
    ? new ProdAppConfig()
    : new DevAppConfig();