import Lecturer from '../models/lecturer'
import type ILecturer from '../interfaces/lecturerInterface'
import Student from '../models/student'
import type IStudent from '../interfaces/studentinterface'
import asyncError from '../middlewares/asyncError'
import ErrorHandler from '../utils/errorHandler'
import sendToken from '../utils/sendToken'
import sendEmail from '../utils/mailer'

// register students
export const registerStudent = asyncError(async (req, res, next) => {
  const { firstName, lastName, email, matricNumber, level, gender, images } =
    req.body
  try {
    const oldStudent: IStudent | null = await Student.findOne({ email }).lean()
    if (oldStudent !== null) {
      next(new ErrorHandler('Student already exist', 400))
      return
    }
    const student: IStudent = new Student({
      firstName,
      lastName,
      email,
      matricNumber,
      level,
      gender,
      images
    })
    await student.save()
    await sendEmail({
      email: student.email,
      subject: 'MTE Student Registration',
      message: `Dear ${student.firstName} ${student.lastName}, you have been successfully registered as a student of our department. <br> Reach out to the department if you did not initiate this operation`
    })
    res.status(201).json({
      success: true,
      message: 'Student data stored successfully'
    })
  } catch (err) {
    next(err)
  }
})

// lecturer sign up
export const lecturerSignUp = asyncError(async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body
  try {
    const oldLecturer: ILecturer | null = await Lecturer.findOne({
      email
    }).lean()
    if (oldLecturer !== null) {
      next(new ErrorHandler('Lecturer already exist', 400))
      return
    }
    const lecturer: ILecturer = new Lecturer({
      firstName,
      lastName,
      email,
      password
    })
    await lecturer.save()
    await sendEmail({
      email: lecturer.email,
      subject: 'Attendance System Registration',
      message: `Dear ${lecturer.firstName} ${lecturer.lastName}, you have been successfully registered as a lecturer in our department.<br> Reach out to the department if you did not initiate this operation`
    })
    sendToken(lecturer, 201, res)
  } catch (err) {
    next(err)
  }
})

// lecturer log in
export const lecturerLogIn = asyncError(async (req, res, next) => {
  const { email, password } = req.body
  if (email === null || password === null) {
    next(new ErrorHandler('Please enter your email and password', 400))
  }
  // check lecturer's details
  const lecturer: ILecturer = (await Lecturer.findOne({ email }).select(
    '+password'
  )) as ILecturer
  if (lecturer === null) {
    next(new ErrorHandler('Invalid email or password', 401))
    return
  }

  // check lecturer's password
  const isPasswordValid = lecturer.validatePassword(password as string)
  if (!isPasswordValid) {
    next(new ErrorHandler('Invalid email or Password', 401))
    return
  }

  await sendEmail({
    email: lecturer.email,
    subject: 'Attendance System - Succesful login notification',
    message: `You have successfully login into the system at ${new Date().toLocaleString()}`
  })
  // send cookie to the frontend for successful login
  sendToken(lecturer, 200, res)
})

// forgot Password
export const forgotPassword = asyncError(async(req, res, next) => {
  const lecturer = await Lecturer.findOne({ email: req.body.email})
  if (lecturer === null) { next(new ErrorHandler('Lecturer not found', 404)); return; }
  
  // generate otp
  const otp = lecturer.generateOtp()
  await lecturer.save({ validateBeforeSave: false })
  try{
    await sendEmail({
      email: lecturer.email,
      subject: 'Attendance System - Password Recovery',
      message: `Your OTP is :<strong>${otp}</strong> <br> Do not share`
    })
    res.status(200).json({success: true, message: 'OTP sent successfully'})
  } catch (err: Error | any) {
    lecturer.otp = ''
    lecturer.otpExpire = new Date()

    await lecturer.save({ validateBeforeSave: false })
    next(new ErrorHandler(err.message as string, 500))
  }
})

// reset password and verify otp
export const resetPassword = asyncError(async(req, res, next) => {
  const { password, confirmPassword, otp } = req.body
  const lecturer = await Lecturer.findOne({
    otp,
    otpExpire: { $gt: Date.now()}
  })
  if (lecturer === null) { next(new ErrorHandler('Invalid OTP', 400));  }
  if (password !== confirmPassword) { next(new ErrorHandler('Password do not match', 400)); return; }

  // setup new password and clear otp
  if (lecturer !== null) {
    lecturer.password = password
    lecturer.otp = ''
    lecturer.otpExpire = new Date()

    await lecturer.save()
    sendToken(lecturer, 200, res)
  }
})