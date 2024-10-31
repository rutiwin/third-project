import { ValidationError } from "./exceptions";
import Joi from "joi";

class userModel {
    userId?: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    isAdmin: boolean;
    token?: string;

    constructor(firstName: string, lastName: string, email: string, password: string, isAdmin: boolean, userId?: number, token?: string) {
        this.userId = userId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.isAdmin = isAdmin;
        this.token = token;
    }

    private static validateSchema = Joi.object({
        userId: Joi.number().optional().positive(),
        firstName: Joi.string().required().min(1).max(50),
        lastName: Joi.string().required().min(1).max(50),
        email: Joi.string().required().email().max(50),
        password: Joi.string().required().min(8).max(255),
        isAdmin: Joi.boolean().required(),
        token: Joi.string().optional().max(255)
    });

    validate(): void {
        const res = userModel.validateSchema.validate(this);
        if (res.error) {
            throw new ValidationError(res.error.details[0].message);
        }
    }
}

export default userModel;
