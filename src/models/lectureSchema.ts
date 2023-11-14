import mongoose from "mongoose";

const lectureSchema = new mongoose.Schema({
    date: { type: Date, required: true },
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true,
    },
});

const Lecture = mongoose.model("Lecture", lectureSchema);
export default Lecture;
