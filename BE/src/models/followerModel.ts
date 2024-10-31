import { ValidationError } from "./exceptions";
import Joi from "joi";

class followerModel {
    userId: number;
    vacationId: number;

    constructor(userId: number, vacationId: number) {
        this.userId = userId;
        this.vacationId = vacationId;
    }

    private static validateSchema = Joi.object({
        userId: Joi.number().required().positive(),
        vacationId: Joi.number().required().positive()
    });

    validate(): void {
        const res = followerModel.validateSchema.validate(this);
        if (res.error) {
            throw new ValidationError(res.error.details[0].message);
        }
    }
}

export default followerModel;