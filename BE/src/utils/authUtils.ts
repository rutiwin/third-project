import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userModel from '../models/userModel';
import { appConfig } from './appConfig';
import { AppException, UnauthorizedError } from '../models/exceptions';

// Function to encrypt password
export async function encryptPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
}

// Function to validate password
export async function validatePassword(password: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
}

export function createToken(user: userModel): string {
    // Ensure userId is part of the token payload
    const userWithoutPassword = { 
        userId: user.userId, // Ensure this is included
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        isAdmin: user.isAdmin
    };

    const secretKey = appConfig.jwtSecret;
    const options = {};

    const token = jwt.sign(userWithoutPassword, secretKey, options);

    return token;    
}

export function verifyToken(token: string, adminRequired: boolean = false): any {
    if (!token) {
        throw new UnauthorizedError('Missing Credentials');
    }
    try {
        const secretKey = appConfig.jwtSecret;
        const res =  jwt.verify(token, secretKey) as {userWithoutPassword: userModel};
        if (adminRequired && !res.userWithoutPassword.isAdmin) {
            throw new UnauthorizedError('Only admin user has access!');
        }
        return res.userWithoutPassword
    } catch (error) {
        if (error instanceof AppException) {
            throw error;
        }
        throw new UnauthorizedError('Wrong Credentials');
    }
}