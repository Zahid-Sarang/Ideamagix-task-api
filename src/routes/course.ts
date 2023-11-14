import express, { Request, Response, NextFunction } from "express";
import { CourseController } from "../controllers/CourseController";
import authenticate from "../middleware/authenticate";
import { canAccess } from "../middleware/canAccess";
import courseValidators from "../validators/course-validators";

const router = express.Router();
const courseController = new CourseController();

router.post(
    "/",
    authenticate,
    canAccess(["admin"]),
    courseValidators,
    (req: Request, res: Response, next: NextFunction) =>
        courseController.createCourse(req, res, next),
);

export default router;
