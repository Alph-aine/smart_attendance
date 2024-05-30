import Lecturer from '../models/lecturer'
import type ILecturer from '../interfaces/lecturerInterface'
import Student from '../models/student'
import type IStudent from '../interfaces/studentinterface'
import asyncError from '../middlewares/asyncError'
import ErrorHandler from '../utils/errorHandler'
import sendToken from '../utils/sendToken'

// register students
export const registerStudent = asyncError(async(req, res, next) => {
    const { firstName, lastName, email, matricNumber, level, gender, images} = req.body
    try{
        const oldStudent: IStudent | null = await Student.findOne({ email }).lean()
        if (oldStudent !== null ){
            next (new ErrorHandler('Student already exist', 400)); return 
        }
        const student: IStudent = new Student({ firstName, lastName, email, matricNumber, level, gender, images})
        await student.save()
        res.status(201).json({
            success: true,
            message: 'Student data stored successfully'
        })
    }catch (err) {
        next(err)
    }
})

// lecturer sign up
export const lecturerSignUp = asyncError(async(req, res, next) => {
    const { firstName, lastName, email, password} = req.body
    try{
        const oldLecturer: ILecturer | null = await Lecturer.findOne({ email}).lean()
        if (oldLecturer !== null){
            next(new ErrorHandler ('Lecturer already exist', 400)); return 
        }
        const lecturer: ILecturer = new Lecturer({ firstName, lastName, email, password})
        await lecturer.save()
        sendToken(lecturer, 201, res)
    }catch (err){
        next(err)
    }
})

// lecturer log in
export const lecturerLogIn = asyncError(async(req, res, next) => {
    const { email , password } = req.body
    if (email === null || password === null) {
        next(new ErrorHandler('Please enter your email and password', 400));  
    }
    // check lecturer's details
    const lecturer: ILecturer = await Lecturer.findOne({ email }).select('+password') as ILecturer
    if (lecturer === null) {
        next(new ErrorHandler('Invalid email or password', 401)); return 
    }

    // check lecturer's password
    const isPasswordValid = lecturer.validatePassword(password as string)
    if(!isPasswordValid){
        next(new ErrorHandler('Invalid email or Password', 401)); return
    }
    
    // send cookie to the frontend for successful login
    sendToken(lecturer, 200, res)
})