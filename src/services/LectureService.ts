import createHttpError from "http-errors";
import Lecture from "../models/lectureSchema";
import { LectureData } from "../types";

export class LectureService {
    constructor() {}

    async createLecture({ date, instructor, course }: LectureData) {
        try {
            return await Lecture.create({ date, instructor, course });
        } catch (err) {
            const error = createHttpError(500, "failed to create lecture");
            throw error;
        }
    }
}
