import express from "express";
import { authRoutes } from "../src/controllers/authController";
import request from "supertest";
import { appConfig } from "../src/utils/appConfig";
import { StatusCode } from "../src/models/statusEnum";
import { closeDB } from "../src/db/dal";

const VALID_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE5LCJmaXJzdE5hbWUiOiJTaGFuaSIsImxhc3ROYW1lIjoiTWlzaGFraSIsImVtYWlsIjoic2hhbmlAZ21haWwuY29tIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTcyNjQyMjc0NX0.fJv3hJg3mF9ga9wfVblSYTv30xLs608S1OAugbq80fE"; // Replace with a valid token if needed

const app = express();
app.use(express.json());
app.use(authRoutes);

describe("Auth Controller", () => {
    beforeAll(() => {
        console.log("Auth Controller tests starting...");
    });

    it("Should successfully register a new user", async () => {
        const newUser = {
            firstName: "eyal",
            lastName: "cohen",
            email: "eyal@gmail.com",
            password: "1234",
            isAdmin: false
        };

        const response = await request(app)
            .post(appConfig.routePrefix + "/auth/register")
            .send(newUser);

        console.log(response.body);

        expect(response.status).toBe(StatusCode.Created);
        expect(response.body).toHaveProperty("token");
    });

    it("Should successfully login an existing user", async () => {
        const loginUser = {
            email: "eyal@gmail.com",
            password: "1234",
        };

        const response = await request(app)
            .post(appConfig.routePrefix + "/auth/login")
            .send(loginUser);

        expect(response.status).toBe(StatusCode.Ok);
        expect(response.body).toHaveProperty("token");
    });

    afterAll(async () => {
        console.log("Auth Controller tests completed.");
        closeDB();
    });
});