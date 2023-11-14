import { NextFunction, Response, Request } from "express";
import { validationResult } from "express-validator";
import { LectureService } from "../services/LectureService";
import { LectureRegisterRequest } from "../types";

export class LectureController {
    constructor(private lectureService: LectureService) {}
    async addLecture(
        req: LectureRegisterRequest,
        res: Response,
        next: NextFunction,
    ) {
        const validationError = validationResult(req);
        if (!validationError.isEmpty()) {
            return res.status(400).json({ error: validationError.array() });
        }
        const { date, instructor, course } = req.body;
        try {
            const lecture = await this.lectureService.createLecture({
                date,
                instructor,
                course,
            });
            res.status(201).json(lecture);
        } catch (err) {
            next(err);
        }
    }

    async getLectures(req: Request, res: Response, next: NextFunction) {
        try {
            const lectures = await this.lectureService.getLectures();
            res.json(lectures);
        } catch (err) {
            next(err);
        }
    }
}
