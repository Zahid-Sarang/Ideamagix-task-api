import createHttpError from "http-errors";
import bcrypt from "bcrypt";
import User from "../models/UserSchema";
import { UserData } from "../types";
export class UserService {
    constructor() {}
    async create({ userName, password, email, role }: UserData) {
        // check if user already exists
        const isEmailExsit = await User.findOne({ email: email });
        if (isEmailExsit) {
            const err = createHttpError(400, "Email is already exists!");
            throw err;
        }

        // Hashed the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        try {
            return await User.create({
                userName,
                email,
                password: hashedPassword,
                role: role,
            });
        } catch (err) {
            const error = createHttpError(500, "failed to create user");
            throw error;
        }
    }
}
