import { ValidationError } from "./exceptions";
import Joi from "joi";

class vacationModel {
    vacationId: number;
    destination: string;
    description: string;
    startDate: Date;
    endDate: Date;
    price: number;
    imageFileName: string;
    followersCount?: number;
    isFollowed?: boolean;

    constructor(vacationId: number, destination: string, description: string, startDate: Date, endDate: Date, price: number, imageFileName: string, followersCount?: number, isFollowed?: boolean) {
        this.vacationId = vacationId;
        this.destination = destination;
        this.description = description;
        this.startDate = startDate;
        this.endDate = endDate;
        this.price = price;
        this.imageFileName = imageFileName;
        this.followersCount = followersCount;
        this.isFollowed = isFollowed;
    }

    private static validateSchema = Joi.object({
        vacationId: Joi.number().optional().positive(),
        destination: Joi.string().required().min(1).max(50),
        description: Joi.string().required().min(1).max(1000),
        startDate: Joi.date().required(),
        endDate: Joi.date().required().min(Joi.ref('startDate')),
        price: Joi.number().required().min(0).max(10000),
        imageFileName: Joi.string().required().max(255),
        followersCount: Joi.number().optional().min(0),
        isFollowed: Joi.boolean().optional()
    });

    validate(): void {
        const res = vacationModel.validateSchema.validate(this);
        if (res.error) {
            throw new ValidationError(res.error.details[0].message);
        }
    }
}

export default vacationModel;