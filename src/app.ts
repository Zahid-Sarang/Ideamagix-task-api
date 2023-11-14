import cookieParser from "cookie-parser";
import express, { NextFunction, Request, Response } from "express";
import { HttpError } from "http-errors";

import logger from "./config/logger";
import authRouter from "./routes/auth";
import courseRouter from "./routes/course";
import lectureRouter from "./routes/lecture";

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.get("/", async (req, res) => {
    res.send("welcome to the app");
});

app.use("/api/auth", authRouter);
app.use("/api/courses", courseRouter);
app.use("/api/lectures", lectureRouter);
app.use("/src/uploads", express.static("src/uploads"));
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
    logger.error(err.message);
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        errors: [
            {
                type: err.name,
                msg: err.message,
                path: "",
                location: "",
            },
        ],
    });
});

export default app;
