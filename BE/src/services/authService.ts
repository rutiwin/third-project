import { ResultSetHeader } from "mysql2";
import runQuery from "../db/dal";
import { ValidationError, NotFoundError, UnknownError } from "../models/exceptions";
import userModel from "../models/userModel";
import { createToken, encryptPassword, validatePassword } from "../utils/authUtils";

// Validate user fields
const validateUserFields = (user: userModel) => {
    if (!user.firstName || !user.lastName || !user.email || !user.password) {
        throw new ValidationError("All fields are mandatory.");
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) {
        throw new ValidationError("Email must be valid.");
    }
    if (user.password.length < 4) {
        throw new ValidationError("Password must be at least 4 characters.");
    }
};

// Register a new user
export async function registerUser(user: userModel): Promise<string> {
    try {
        validateUserFields(user);
        
        // Check if the email is already taken
        const emailCheckQuery = `SELECT * FROM user WHERE email = ?`;
        const existingUser = await runQuery(emailCheckQuery, [user.email]);

        if (existingUser.length > 0) {
            throw new ValidationError("Email is already in use.");
        }

        // Hash the password before saving
        const hashedPassword = await encryptPassword(user.password);

        const insertQuery = `
            INSERT INTO user (firstName, lastName, email, password, isAdmin) 
            VALUES (?, ?, ?, ?, ?)
        `;
        const result = await runQuery(insertQuery, [
            user.firstName,
            user.lastName,
            user.email,
            hashedPassword,
            user.isAdmin || false
        ]) as ResultSetHeader | any;

        if (result.affectedRows === 0) {
            throw new UnknownError("Failed to register user.");
        }

        // Generate a token for the newly registered user
        const userId = result.insertId;
        user.userId = userId
        const token = createToken(user);

        // Save the token in the database
        const tokenUpdateQuery = `UPDATE user SET token = ? WHERE userId = ?`;
        await runQuery(tokenUpdateQuery, [token, userId]);

        return token; // Return the token to the newly registered user
    } catch (error) {
        if (!(error instanceof ValidationError)) {
            throw new UnknownError();
        }
        throw error;
    }
}

// User login
export async function loginUser(email: string, password: string): Promise<{ user: userModel, token: string }> {
    try {
        if (!email || !password) {
            throw new ValidationError("Both email and password are required.");
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            throw new ValidationError("Email must be valid.");
        }
        if (password.length < 4) {
            throw new ValidationError("Password must be at least 4 characters.");
        }

        const loginQuery = `SELECT * FROM user WHERE email = ?`;
        const res = await runQuery(loginQuery, [email]);

        if (res.length === 0) {
            throw new ValidationError("Email or password is incorrect.");
        }

        const user = res[0] as userModel;

        // Verify the password
        const isPasswordValid = await validatePassword(password, user.password);
        if (!isPasswordValid) {
            throw new ValidationError("Email or password is incorrect.");
        }

        // Generate a JWT token if not already present
        let token = user.token;
        if (!token) {
            token = createToken(user);
            const tokenUpdateQuery = `UPDATE user SET token = ? WHERE userId = ?`;
            await runQuery(tokenUpdateQuery, [token, user.userId]);
        }

        return {
            user: new userModel(user.firstName, user.lastName, user.email, user.password, user.isAdmin, user.userId, user.token),
            token
        };
    } catch (error) {
        if (!(error instanceof ValidationError)) {
            throw new UnknownError();
        }
        throw error;
    }
}