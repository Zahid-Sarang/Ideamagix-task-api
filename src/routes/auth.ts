import express, { NextFunction, Response } from "express";
import logger from "../config/logger";
import { AuthController } from "../controllers/AuthController";
import { TokenService } from "../services/TokenService";
import { UserService } from "../services/UserServices";
import { RegisterUserRequest } from "../types";
import registerValidators from "../validators/register-validators";

const router = express.Router();

const userService = new UserService();
const tokenService = new TokenService();
const authController = new AuthController(userService, logger, tokenService);
router.post(
    "/register",
    registerValidators,
    (req: RegisterUserRequest, res: Response, next: NextFunction) =>
        authController.register(req, res, next),
);

export default router;
