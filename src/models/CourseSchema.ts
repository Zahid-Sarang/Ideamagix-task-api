import mongoose from "mongoose";
import { Config } from "../config";

const courseSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        level: { type: String, required: true },
        description: { type: String, required: true },
        image: {
            type: String,
            require: true,
            get: (image: string) => {
                return `${Config.APP_URL}/${image}`;
            },
        },
        lectures: [{ type: mongoose.Schema.Types.ObjectId, ref: "Lecture" }],
    },
    { timestamps: true, toJSON: { getters: true } },
);

const Course = mongoose.model("Course", courseSchema);

export default Course;
