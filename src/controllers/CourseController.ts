import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

export class CourseController {
    constructor() {}
    async createCourse(req: Request, res: Response, next: NextFunction) {
        // Validation
        const validationError = validationResult(req);
        if (!validationError.isEmpty()) {
            return res.status(400).json({ error: validationError.array() });
        }
        try {
            res.status(201).json({ message: "Course created!" });
        } catch (err) {
            next(err);
        }
    }
}
