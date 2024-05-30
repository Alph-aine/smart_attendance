import Lecturer from '../models/lecturer'
import asyncError from '../middlewares/asyncError'
import ErrorHandler from '../utils/errorHandler'
import Student from '../models/student'

// get all students
export const getAllStudents = asyncError(async (req: any, res: any) => {
  const students = await Student.find()
  res.status(200).json({
    success: true,
    students
  })
})

// get all lecturers
export const getAllLecturers = asyncError(async (req: any, res: any) => {
  const lecturers = await Lecturer.find()
  res.status(200).json({
    success: true,
    lecturers
  })
})


// get lecturer by id
export const getLecturerById = asyncError(
  async (req: any, res: any, next: any) => {
    const lecturer = await Lecturer.findById(req.params.id)
    if (lecturer === null)
      return next(new ErrorHandler('Lecturer not found', 404))
    res.status(200).json({ success: true, lecturer })
  }
)

// get lecturer by email
export const getLecturerByEmail = asyncError(
  async (req: any, res: any, next: any) => {
    const lecturer = await Lecturer.findOne({ email: req.params.email })
    if (lecturer === null)
      return next(new ErrorHandler('Lecturer not found', 404))
    res.status(200).json({ success: true, lecturer })
  }
)

// update lecturer details
export const updateLecturerProfile = asyncError(
  async (req: any, res: any, next: any): Promise<void> => {
    if (req.user.id !== req.params.id)
      return next(new ErrorHandler('Not Authorized to update this user', 401))
    const lecturer = await Lecturer.findById(req.params.id)
    if (lecturer === null)
      return next(new ErrorHandler('Lecturer not found', 404))

    // get details and update
    const { firstName, lastName, email } = req.body
    const updateData = {
      firstName: firstName !== undefined ? firstName : lecturer.firstName,
      lastName: lastName !== undefined ? lastName : lecturer.lastName,
      email: email !== undefined ? email : lecturer.email
    }
    const updatedLecturer = await Lecturer.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    )
    res.status(200).json({ success: true, user: updatedLecturer })
  }
)

// update lecturer password
export const updateLecturerPassword = asyncError(
  async (req: any, res: any, next: any) => {
    const { oldPassword, newPassword } = req.body
    const lecturer = await Lecturer.findById(req.user.id).select('+password')
    if (lecturer === null)
      return next(new ErrorHandler('Lecturer not found', 404))

    const isPasswordValid = lecturer.validatePassword(oldPassword as string) // Add type annotation to oldPassword
    if (!isPasswordValid)
      return next(new ErrorHandler('Incorrect old password', 401))

    if (oldPassword === newPassword)
      return next(new ErrorHandler('Enter a new Password', 400))

    lecturer.password = newPassword
    await lecturer.save()
    res
      .status(200)
      .json({ success: true, message: 'Password updated successfully' })
  }
)

// delete lecturer account
export const deleteLecturerAccount = asyncError(
  async (req: any, res: any, next: any) => {
    const lecturer = await Lecturer.findByIdAndDelete(req.params.id)
    if (lecturer == null)
      return next(new ErrorHandler('Lecturer not found', 404))
    res
      .status(200)
      .json({ success: true, message: 'Lecturer account deleted successfully' })
  }
)

// get student by matric number
export const getStudentByMatricNumber = asyncError(
  async (req: any, res: any, next: any) => {
    const student = await Student.findOne({
      matricNumber: req.params.matricNumber
    })
    if (student === null)
      return next(new ErrorHandler('Student not found', 404))
    res.status(200).json({ success: true, student })
  }
)
