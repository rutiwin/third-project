import express from "express";
import { vacationRoutes } from "../src/controllers/vacationController";
import request from "supertest";
import { appConfig } from "../src/utils/appConfig";
import { StatusCode } from "../src/models/statusEnum";
import { closeDB } from "../src/db/dal";

const VALID_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE5LCJmaXJzdE5hbWUiOiJTaGFuaSIsImxhc3ROYW1lIjoiTWlzaGFraSIsImVtYWlsIjoic2hhbmlAZ21haWwuY29tIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTcyNjQyMjc0NX0.fJv3hJg3mF9ga9wfVblSYTv30xLs608S1OAugbq80fE"; // Replace with a valid token if needed
const ADMIN_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIxLCJmaXJzdE5hbWUiOiJSdXRpIiwibGFzdE5hbWUiOiJXZWluZ2FydGVuIiwiZW1haWwiOiJydXRpQGdtYWlsLmNvbSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTcyNjQyMzQ4Nn0.Z9jIDS4lq1Lrepx6crXB-gvXFqEtscqoP60ALyXqnRE"; // Replace with an admin token

const app = express();
app.use(express.json());
app.use(vacationRoutes);

describe("Vacation Controller", () => {
    let vacationId: number | undefined;

    beforeAll(() => {
        console.log("Vacation Controller tests starting...");
    });

    it("Should edit a new vacation (Admin only)", async () => {
        const newVacation = {
            destination: "ruti",
            description: "A beautiful beach vacation.",
            price: 1500,
            startDate: "2024-10-05",
            endDate: "2024-10-07",
            imageFileName: ""
        };

        vacationId = 67 // Make sure it's an existing vacation ID.
        const response = await request(app)
        .put(appConfig.routePrefix + "/vacations/" + vacationId) // הוספת ה-ID של החופשה
        .set("Authorization", `Bearer ${ADMIN_TOKEN}`)
        .send(newVacation);
        
        expect(response.status).toBe(StatusCode.Ok);
        expect(response.body).toHaveProperty("message", "Vacation updated successfully!");
    });

    it("Should get all vacations", async () => {
        const response = await request(app)
            .get(appConfig.routePrefix + "/vacations")
            .set("Authorization", `Bearer ${VALID_TOKEN}`);

        expect(response.status).toBe(StatusCode.Ok);
    });

    it("Should fail to delete a vacation without admin rights", async () => {
        const response = await request(app)
            .delete(`${appConfig.routePrefix}/vacations/${vacationId}`)
            .set("Authorization", `Bearer ${VALID_TOKEN}`); // Non-admin token

        expect(response.status).toBe(StatusCode.Unauthorized); // Assuming 401 for unauthorized
    });

    afterAll(async () => {
        console.log("Vacation Controller tests completed.");
        await closeDB();
    });
});