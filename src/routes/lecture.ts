import express, { NextFunction, Response } from "express";
import { LectureController } from "../controllers/LectureController";
import authenticate from "../middleware/authenticate";
import { canAccess } from "../middleware/canAccess";
import checkClash from "../middleware/lectureConflict";
import { LectureService } from "../services/LectureService";
import { LectureRegisterRequest } from "../types";
import lectureValidators from "../validators/lecture-validators";

const router = express.Router();
const lectureService = new LectureService();
const lectureController = new LectureController(lectureService);

router.post(
    "/",
    authenticate,
    canAccess(["admin"]),
    lectureValidators,
    checkClash,
    (req: LectureRegisterRequest, res: Response, next: NextFunction) =>
        lectureController.addLecture(req, res, next),
);
router.get(
    "/",
    authenticate,
    canAccess(["admin"]),
    (req: LectureRegisterRequest, res: Response, next: NextFunction) =>
        lectureController.getLectures(req, res, next),
);
export default router;
