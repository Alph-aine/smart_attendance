/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express'
import isAuthenticated from '../middlewares/checkAuth'
import {
  createCourse,
  getAllCourses,
  getCourseById,
  getCourseByLecturer,
  getCourseByLevel,
  updateCourseById,
  deleteCourseById
} from '../controllers/courseC'

const router = express.Router()

/**
 * @swagger
 * /courses/new:
 *   post:
 *     summary: Creates a new course
 *     description: Allows authenticated users to create a new course with the provided details.
 *     tags:
 *       - Courses
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               courseName:
 *                 type: string
 *                 description: The name of the course.
 *               courseCode:
 *                 type: string
 *                 description: A unique identifier for the course.
 *               level:
 *                 type: string
 *                 description: The academic level of the course (e.g., '100', '200').
 *               day:
 *                 type: string
 *                 description: The day of the week the course is held.
 *               time:
 *                 type: string
 *                 description: The scheduled time for the course.
 *     responses:
 *       201:
 *         description: The course has been successfully created.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 course:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       description: The unique identifier of the newly created course.
 *                     courseName:
 *                       type: string
 *                       description: The name of the course.
 *                     courseCode:
 *                       type: string
 *                       description: A unique identifier for the course.
 *                     level:
 *                       type: string
 *                       description: The academic level of the course (e.g., '100', '200').
 *                     day:
 *                       type: string
 *                       description: The day of the week the course is held.
 *                     time:
 *                       type: string
 *                       description: The scheduled time for the course.
 *       400:
 *         description: Bad Request. There was an error creating the course.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Unauthorized. User must be logged in to create a course.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/courses/new', isAuthenticated, createCourse)

/**
 * @swagger
 * /courses/all:
 *   get:
 *     summary: Retrieves all courses
 *     description: Returns a list of all courses available, including the first name of the assigned lecturer for each course.
 *     tags:
 *       - Courses
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of all courses.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 courses:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: The unique identifier of the course.
 *                       courseName:
 *                         type: string
 *                         description: The name of the course.
 *                       courseCode:
 *                         type: string
 *                         description: A unique identifier for the course.
 *                       level:
 *                         type: string
 *                         description: The academic level of the course (e.g., '100', '200').
 *                       day:
 *                         type: string
 *                         description: The day of the week the course is held.
 *                       time:
 *                         type: string
 *                         description: The scheduled time for the course.
 *                       lecturer:
 *                         type: object
 *                         properties:
 *                           firstName:
 *                             type: string
 *                             description: The first name of the lecturer.
 *       401:
 *         description: Unauthorized. User must be logged in to view courses.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/courses/all', isAuthenticated, getAllCourses)

/**
 * @swagger
 * /courses/{id}:
 *   get:
 *     summary: Retrieves a course by ID
 *     description: Returns the details of a specific course identified by its ID, including the first name of the assigned lecturer.
 *     tags:
 *       - Courses
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the course.
 *     responses:
 *       200:
 *         description: The requested course details.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 course:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       description: The unique identifier of the course.
 *                     courseName:
 *                       type: string
 *                       description: The name of the course.
 *                     courseCode:
 *                       type: string
 *                       description: A unique identifier for the course.
 *                     level:
 *                       type: string
 *                       description: The academic level of the course (e.g., '100', '200').
 *                     day:
 *                       type: string
 *                       description: The day of the week the course is held.
 *                     time:
 *                       type: string
 *                       description: The scheduled time for the course.
 *                     lecturer:
 *                       type: object
 *                       properties:
 *                         firstName:
 *                           type: string
 *                           description: The first name of the lecturer.
 *       404:
 *         description: Not Found. The course with the specified ID was not found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Unauthorized. User must be logged in to view course details.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/courses/:id', isAuthenticated, getCourseById)

/**
 * @swagger
 * /courses/{lecturerId}:
 *   get:
 *     summary: Retrieves courses by lecturer ID
 *     description: Returns a list of all courses taught by a specific lecturer identified by their ID, including the first name of the lecturer.
 *     tags:
 *       - Courses
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: lecturerId
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the lecturer.
 *     responses:
 *       200:
 *         description: A list of courses taught by the specified lecturer.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 courses:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: The unique identifier of the course.
 *                       courseName:
 *                         type: string
 *                         description: The name of the course.
 *                       courseCode:
 *                         type: string
 *                         description: A unique identifier for the course.
 *                       level:
 *                         type: string
 *                         description: The academic level of the course (e.g., '100', '200').
 *                       day:
 *                         type: string
 *                         description: The day of the week the course is held.
 *                       time:
 *                         type: string
 *                         description: The scheduled time for the course.
 *                       lecturer:
 *                         type: object
 *                         properties:
 *                           firstName:
 *                             type: string
 *                             description: The first name of the lecturer.
 *       404:
 *         description: Not Found. No courses were found for the specified lecturer.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Unauthorized. User must be logged in to view courses.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/courses/:lecturerId', isAuthenticated, getCourseByLecturer)

/**
 * @swagger
 * /courses/{level}:
 *   get:
 *     summary: Retrieves courses by academic level
 *     description: Returns a list of all courses available at a specific academic level, including the first name of the assigned lecturer for each course.
 *     tags:
 *       - Courses
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: level
 *         required: true
 *         schema:
 *           type: string
 *         description: The academic level of the courses to retrieve (e.g., '100', '200').
 *     responses:
 *       200:
 *         description: A list of courses at the specified academic level.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 courses:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: The unique identifier of the course.
 *                       courseName:
 *                         type: string
 *                         description: The name of the course.
 *                       courseCode:
 *                         type: string
 *                         description: A unique identifier for the course.
 *                       level:
 *                         type: string
 *                         description: The academic level of the course (e.g., '100', '200').
 *                       day:
 *                         type: string
 *                         description: The day of the week the course is held.
 *                       time:
 *                         type: string
 *                         description: The scheduled time for the course.
 *                       lecturer:
 *                         type: object
 *                         properties:
 *                           firstName:
 *                             type: string
 *                             description: The first name of the lecturer.
 *       404:
 *         description: Not Found. No courses were found for the specified level.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Unauthorized. User must be logged in to view courses.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/courses/:level', isAuthenticated, getCourseByLevel)

/**
 * @swagger
 * /courses/{id}:
 *   put:
 *     summary: Updates a course by ID
 *     description: Updates the details of a specific course identified by its ID. Requires authentication.
 *     tags:
 *       - Courses
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the course to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               courseName:
 *                 type: string
 *                 description: The new name of the course.
 *               courseCode:
 *                 type: string
 *                 description: The new unique identifier for the course.
 *               level:
 *                 type: string
 *                 description: The new academic level of the course (e.g., '100', '200').
 *               day:
 *                 type: string
 *                 description: The new day of the week the course is held.
 *               time:
 *                 type: string
 *                 description: The new scheduled time for the course.
 *     responses:
 *       200:
 *         description: The course has been successfully updated.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 updatedCourse:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       description: The unique identifier of the updated course.
 *                     courseName:
 *                       type: string
 *                       description: The new name of the course.
 *                     courseCode:
 *                       type: string
 *                       description: The new unique identifier for the course.
 *                     level:
 *                       type: string
 *                       description: The new academic level of the course (e.g., '100', '200').
 *                     day:
 *                       type: string
 *                       description: The new day of the week the course is held.
 *                     time:
 *                       type: string
 *                       description: The new scheduled time for the course.
 *       404:
 *         description: Not Found. The course with the specified ID was not found or the user is not authorized to edit this course.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Unauthorized. User must be logged in to update a course.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.put('/courses/:id', isAuthenticated, updateCourseById)

/**
 * @swagger
 * /courses/{id}:
 *   delete:
 *     summary: Deletes a course by ID
 *     description: Deletes a specific course identified by its ID. Requires authentication.
 *     tags:
 *       - Courses
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the course to delete.
 *     responses:
 *       200:
 *         description: The course has been successfully deleted.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: 'Course deleted successfully'
 *       404:
 *         description: Not Found. The course with the specified ID was not found or the user is not authorized to delete this course.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: 'Course not found or you are not authorized to delete this course'
 *       401:
 *         description: Unauthorized. User must be logged in to delete a course.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete('/courses/:id', isAuthenticated, deleteCourseById)

export default router
