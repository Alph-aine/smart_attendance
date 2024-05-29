import mongoose from "mongoose"
import type ICourse from '../interfaces/courseInterface'

const courseSchema = new mongoose.Schema({
    courseName: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 100
    },
    courseCode: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        minlength: 6,
        maxlength: 10
    },
    level: {
        type: String,
        required: true,
        enum: ['100','200','300','400','500']
    },
    day: {
        type: String,
        required: true,
        enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
    },
    time: {
        type: String,
        required: true,
    },
    lecturer: { 
        type: mongoose.Schema.Types.ObjectId,
         ref: 'Lecturer',
         required: true
    }
}, {timestamps: true}
)

const Course = mongoose.model<ICourse>('Course', courseSchema)
export default Course