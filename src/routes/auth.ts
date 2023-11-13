import express, { NextFunction, Response } from "express";
import { AuthController } from "../controllers/AuthController";
import { UserService } from "../services/UserServices";
import { RegisterUserRequest } from "../types";
import registerValidators from "../validators/register-validators";

const router = express.Router();

const userService = new UserService();
const authController = new AuthController(userService);
router.post(
    "/register",
    registerValidators,
    (req: RegisterUserRequest, res: Response, next: NextFunction) =>
        authController.register(req, res, next),
);

export default router;
