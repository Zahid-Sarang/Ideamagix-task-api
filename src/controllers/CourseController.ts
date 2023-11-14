import { Response, Request, NextFunction } from "express";
import createHttpError from "http-errors";
import { CourseService } from "../services/CourseService";
import { CourseRegisterRequest } from "../types";
import { handleMultiPartData } from "../utils/fileUpload";

export class CourseController {
    constructor(private courseService: CourseService) {}
    async createCourse(
        req: CourseRegisterRequest,
        res: Response,
        next: NextFunction,
    ) {
        handleMultiPartData(req, res, async (err) => {
            if (err) {
                return next(err);
            }
            const filePath = req.file?.path;
            const { name, level, description } = req.body;
            // Validation;

            if (!name || !level || !description || !filePath) {
                const error = createHttpError(400, "All files are required!");
                return next(error);
            }
            let course;
            try {
                course = await this.courseService.createCourse({
                    name,
                    level,
                    description,
                    filePath,
                });
            } catch (err) {
                next(err);
            }
            res.status(201).json(course);
        });
    }

    async getCourses(req: Request, res: Response, next: NextFunction) {
        try {
            const course = await this.courseService.getCourseList();
            res.json(course);
        } catch (err) {
            next(err);
        }
    }
}
