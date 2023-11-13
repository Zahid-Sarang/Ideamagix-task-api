import express, { NextFunction, Request, Response } from "express";
import logger from "../config/logger";
import { AuthController } from "../controllers/AuthController";
import { TokenService } from "../services/TokenService";
import { UserService } from "../services/UserServices";
import { AuthRequest, RegisterUserRequest } from "../types";
import loginValidators from "../validators/login-validators";
import registerValidators from "../validators/register-validators";
import { CredentialService } from "../services/CredentialService";
import authenticate from "../middleware/authenticate";

const router = express.Router();

const userService = new UserService();
const tokenService = new TokenService();
const credentialsService = new CredentialService();
const authController = new AuthController(
    userService,
    logger,
    tokenService,
    credentialsService,
);
router.post(
    "/register",
    registerValidators,
    (req: RegisterUserRequest, res: Response, next: NextFunction) =>
        authController.register(req, res, next),
);

router.post(
    "/login",
    loginValidators,
    (req: Request, res: Response, next: NextFunction) =>
        authController.login(req, res, next),
);

router.get(
    "/self",
    authenticate,
    (req: Request, res: Response, next: NextFunction) =>
        authController.self(req as AuthRequest, res, next),
);

export default router;
