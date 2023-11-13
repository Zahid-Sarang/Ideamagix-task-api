import { NextFunction, Response } from "express";
import { validationResult } from "express-validator";
import { UserService } from "../services/UserServices";
import { RegisterUserRequest } from "../types";

export class AuthController {
    constructor(private userService: UserService) {}

    async register(
        req: RegisterUserRequest,
        res: Response,
        next: NextFunction,
    ) {
        const validationError = validationResult(req);
        if (!validationError.isEmpty()) {
            return res.status(400).json({ error: validationError.array() });
        }
        const { userName, email, password } = req.body;
        try {
            const users = await this.userService.create({
                userName,
                email,
                password,
                role: "admin",
            });
            res.status(201).json({ users });
        } catch (error) {
            next(error);
        }
    }
}
