import express, { Request, Response } from "express"
import cors from "cors";
import { isDbServerUp } from "./utils/helpers";
import { appConfig } from "./utils/appConfig";
import catchAll from "./middlewares/catchAll";
import { authRoutes } from "./controllers/authController";
import { doorman } from "./middlewares/doormanMiddleware"
import { vacationRoutes } from "./controllers/vacationController";
import dotenv from "dotenv";
import expressRateLimit from "express-rate-limit";
import expressFileUpload from "express-fileupload"
import path from "path";

// load environment variables
dotenv.config();

const server = express();

// protect from dos attack
server.use(expressRateLimit({
    windowMs: 1000,
    max: 500,
}))

server.use(cors({origin: ["http://localhost:3000", "http://localhost:7805"]}));
// server.use(cors());

// load body
server.use(express.json());

// load files
server.use(expressFileUpload());

server.use('/assets/images', express.static(path.join(__dirname, 'assets/images')));

// Doorman security check
server.use(doorman);

// register controllers
server.use("/", authRoutes);
server.use("/", vacationRoutes);

// Error handling
server.use(catchAll);

// run server only if DB-server is active
isDbServerUp().then((isUp) => {
    if (isUp) {
        server.listen(appConfig.port, () => {
            console.log(`Listening on http://localhost:${appConfig.port}`);
        })
    } else {
        console.error("\n\n****\nDB server is not up!!!\n****\n");
    }
})
