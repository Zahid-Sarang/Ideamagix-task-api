import express, { Request, Response, NextFunction } from "express";
import { CourseController } from "../controllers/CourseController";
import authenticate from "../middleware/authenticate";
import { canAccess } from "../middleware/canAccess";
import { CourseService } from "../services/CourseService";

const router = express.Router();
const courseService = new CourseService();
const courseController = new CourseController(courseService);

router.post(
    "/",
    authenticate,
    canAccess(["admin"]),
    (req: Request, res: Response, next: NextFunction) =>
        courseController.createCourse(req, res, next),
);

router.get(
    "/",
    authenticate,
    canAccess(["admin"]),
    (req: Request, res: Response, next: NextFunction) =>
        courseController.getCourses(req, res, next),
);
export default router;
