import Course from "../models/CourseSchema";
import { CourseData } from "../types";

export class CourseService {
    constructor() {}
    async createCourse({ name, level, description, filePath }: CourseData) {
        return await Course.create({
            name,
            level,
            description,
            image: filePath,
        });
    }

    async getCourseList() {
        return await Course.find();
    }
}
