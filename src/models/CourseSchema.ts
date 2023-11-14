import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    level: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String }, // You can store the image URL
    lectures: [{ type: mongoose.Schema.Types.ObjectId, ref: "Lecture" }],
});

const Course = mongoose.model("Course", courseSchema);

export default Course;
