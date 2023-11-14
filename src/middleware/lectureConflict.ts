import { NextFunction, Response } from "express";
import createHttpError from "http-errors";
import Lecture from "../models/lectureSchema";
import { LectureRegisterRequest } from "../types";

const checkClash = async (
    req: LectureRegisterRequest,
    res: Response,
    next: NextFunction,
) => {
    const { date, instructor } = req.body;

    try {
        const clash = await Lecture.findOne({ date, instructor });
        if (clash) {
            const error = createHttpError(
                400,
                "Instructor has a conflicting schedule on this date!",
            );
            next(error);
        }
        next();
    } catch (err) {
        next(err);
    }
};

export default checkClash;
