import { NextFunction, Response } from "express";
import { validationResult } from "express-validator";
import { JwtPayload } from "jsonwebtoken";
import { Logger } from "winston";
import { TokenService } from "../services/TokenService";
import { UserService } from "../services/UserServices";
import { RegisterUserRequest } from "../types";

export class AuthController {
    constructor(
        private userService: UserService,
        private logger: Logger,
        private tokenService: TokenService,
    ) {}

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
            const user = await this.userService.create({
                userName,
                email,
                password,
                role: "admin",
            });
            this.logger.info("User has been registered");

            // token payload
            const payload: JwtPayload = {
                sub: String(user.id),
                role: user.role,
            };
            // generate accessToken
            const { accessToken, refreshToken } =
                this.tokenService.generateAccessToken(payload);

            // send httpOnly cookies
            res.cookie("accessToken", accessToken, {
                domain: "localhost",
                sameSite: "strict",
                maxAge: 1000 * 60 * 60,
                httpOnly: true,
            });

            res.cookie("refreshToken", refreshToken, {
                domain: "localhost",
                sameSite: "strict",
                maxAge: 1000 * 60 * 60 * 24 * 365,
                httpOnly: true,
            });
            res.status(201).json({ user });
        } catch (error) {
            next(error);
        }
    }
}
