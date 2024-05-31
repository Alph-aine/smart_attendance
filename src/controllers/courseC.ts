import Course from '../models/course'
import asyncError from '../middlewares/asyncError'
import ErrorHandler from '../utils/errorHandler'

// create a new course
export const createCourse = asyncError(
  async (req: any, res: any, next: any): Promise<void> => {
    try {
      const { courseName, courseCode, level, day, time } = req.body
      const lecturer = req.user.id
      const course = await Course.create({
        courseName,
        courseCode,
        level,
        day,
        time,
        lecturer
      })

      await course.save()
      res.status(201).json({
        success: true,
        course
      })
    } catch (err: Error | any) {
      return next(new ErrorHandler(err.message as string, 400))
    }
  }
)

// get all courses
export const getAllCourses = asyncError(
  async (req: any, res: any, next: any): Promise<void> => {
    const courses = await Course.find().populate('lecturer', 'firstName')
    res.status(200).json({
      success: true,
      courses
    })
  }
)

// get course by id
export const getCourseById = asyncError(
  async (req: any, res: any, next: any): Promise<void> => {
    const course = await Course.findById(req.params.id).populate(
      'lecturer',
      'firstName'
    )
    if (course === null) return next(new ErrorHandler('Course  not found', 404))

    res.status(200).json({
      success: true,
      course
    })
  }
)

// get courses by a lecturer
export const getCourseByLecturer = asyncError(
  async (req: any, res: any, next: any): Promise<void> => {
    const courses = await Course.find({ lecturer: req.params.id }).populate(
      'lecturer',
      'firstName'
    )
    if (courses.length === 0)
      return next(new ErrorHandler('No courses by this lecturer', 404))

    res.status(200).json({
      success: true,
      courses
    })
  }
)

// get courses by level
export const getCourseByLevel = asyncError(
  async (req: any, res: any, next: any): Promise<void> => {
    const courses = await Course.find({ level: req.params.level }).populate(
      'lecturer',
      'firstName'
    )
    if (courses.length === 0)
      return next(new ErrorHandler('No courses for this level :(', 404))

    res.status(200).json({
      success: true,
      courses
    })
  }
)

// update a course by id
export const updateCourseById = asyncError(
  async (req: any, res: any, next: any): Promise<void> => {
    const { courseName, courseCode, level, day, time } = req.body
    const updatedCourse = await Course.findOneAndUpdate(
      { _id: req.params.id, lecturer: req.user.id },
      { courseName, courseCode, level, day, time },
      { new: true, runValidators: true, upsert: false }
    )

    if (updatedCourse === null)
      return next(
        new ErrorHandler(
          "Course not found or you're not authorized to edit this course",
          404
        )
      )

    res.status(200).json({ success: true, updatedCourse })
  }
)

// delete a course by id
export const deleteCourseById = asyncError(
  async (req: any, res: any, next: any): Promise<void> => {
    const deletedCourse = await Course.findOneAndDelete({
      _id: req.params.id,
      lecturer: req.user.id
    })
    if (deletedCourse === null) {
      return res.status(404).json({
        success: false,
        message:
          'Course not found or you are not atuthorized to delete this course'
      })
    }
    res.status(200).json({
      success: true,
      message: 'Course deleted successfully'
    })
  }
)
