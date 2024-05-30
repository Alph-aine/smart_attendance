import Lecturer from "../models/lecturer"
import asyncError from "../middlewares/asyncError"
import ErrorHandler from "../utils/errorHandler"
import Student from "../models/student"

// get all students
export const getAllStudents = asyncError(async(req: any, res: any) => {
    const students = await Student.find()
    res.status(200).json({
        success: true,
        students
    })
})

// get all lecturers
export const getAllLecturers = asyncError(async(req: any, res: any) => {
    const lecturers = await Lecturer.find()
    res.status(200).json({
        success: true,
        lecturers
    })
})


// get lecturer by id
export const getLecturerById = asyncError(async(req: any, res: any, next: any) => {
    const lecturer = await Lecturer.findById(req.params.id)
    if (lecturer === null) return next(new ErrorHandler('Lecturer not found', 404))
    res.status(200).json({success: true, lecturer})
})

// get lecturer by email
export const getLecturerByEmail = asyncError(async(req: any, res: any, next: any) => {
    const lecturer = await Lecturer.findOne({ email: req.params.email })
    if (lecturer === null) return next(new ErrorHandler('Lecturer not found', 404))
    res.status(200).json({ success: true, lecturer})
})

// update lecturer details
