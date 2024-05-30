/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express'
import {
  getLecturerById,
  getAllStudents,
  getLecturerByEmail,
  updateLecturerProfile,
  updateLecturerPassword,
  getStudentByMatricNumber,
  deleteLecturerAccount
} from '../controllers/profileC'

import isAuthenticated from '../middlewares/checkAuth'

const router = express.Router()

/**
 * @swagger
 * /lecturer/id/{id}:
 *   get:
 *     summary: Retrieve a lecturer by ID
 *     description: Fetches a lecturer's details based on their unique identifier.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the lecturer.
 *     responses:
 *       200:
 *         description: Successfully retrieved lecturer details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 lecturer:
 *                   $ref: '#/components/schemas/Lecturer'
 *       404:
 *         description: Lecturer not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: 'Lecturer not found'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: 'Internal Server Error'
 */
router.get('/lecturer/id/:id',  isAuthenticated, getLecturerById)

/**
 * @swagger
 * /lecturer/email/{email}:
 *   get:
 *     summary: Retrieve a lecturer by email
 *     description: Fetches a lecturer's details based on their email address.
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *         description: The email address of the lecturer.
 *     responses:
 *       200:
 *         description: Successfully retrieved lecturer details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 lecturer:
 *                   $ref: '#/components/schemas/Lecturer'
 *       404:
 *         description: Lecturer not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: 'Lecturer not found'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: 'Internal Server Error'
 */
router.get('/lecturer/email/:email', isAuthenticated, getLecturerByEmail)
/**
 * @swagger
 * /lecturer/id/{id}:
 *   put:
 *     summary: Update a lecturer's profile
 *     description: Updates the details of a lecturer based on their unique identifier.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the lecturer.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 description: The first name of the lecturer.
 *               lastName:
 *                 type: string
 *                 description: The last name of the lecturer.
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The email address of the lecturer.
 *     responses:
 *       200:
 *         description: Successfully updated lecturer details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 user:
 *                   $ref: '#/components/schemas/Lecturer'
 *       401:
 *         description: Not authorized to update this user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: 'Not Authorized to update this user'
 *       404:
 *         description: Lecturer not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: 'Lecturer not found'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: 'Internal Server Error'
 */
router.put('/lecturer/id/:id', isAuthenticated, updateLecturerProfile)

/**
 * @swagger
 * /lecturer/password/update:
 *   put:
 *     summary: Update a lecturer's password
 *     description: Allows a lecturer to change their password.
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *         description: JWT token for authentication.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               oldPassword:
 *                 type: string
 *                 description: The current password of the lecturer.
 *               newPassword:
 *                 type: string
 *                 description: The new password for the lecturer.
 *     responses:
 *       200:
 *         description: Password updated successfully
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
 *                   example: 'Password updated successfully'
 *       401:
 *         description: Incorrect old password
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: 'Incorrect old password'
 *       404:
 *         description: Lecturer not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: 'Lecturer not found'
 *       400:
 *         description: Enter a new password
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: 'Enter a new password'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: 'Internal Server Error'
 */
router.put('/lecturer/password/update', isAuthenticated, updateLecturerPassword)

/**
 * @swagger
 * /student/{matricNumber}:
 *   get:
 *     summary: Retrieve a student by matriculation number
 *     description: Fetches a student's details based on their matriculation number.
 *     parameters:
 *       - in: path
 *         name: matricNumber
 *         required: true
 *         schema:
 *           type: string
 *         description: The matriculation number of the student.
 *     responses:
 *       200:
 *         description: Successfully retrieved student details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 student:
 *                   $ref: '#/components/schemas/Student'
 *       404:
 *         description: Student not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: 'Student not found'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: 'Internal Server Error'
 */
router.get('/student/:matricNumber', isAuthenticated, getStudentByMatricNumber)

/**
 * @swagger
 * /student:
 *   get:
 *     summary: Retrieve all students
 *     description: Fetches the details of all students.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved all students
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 students:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Student'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: 'Unauthorized'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: 'Internal Server Error'
 */
router.get('/student', isAuthenticated, getAllStudents)

/**
 * @swagger
 * /lecturer/id/{id}:
 *   delete:
 *     summary: Deletes a lecturer's account by ID
 *     description: This endpoint allows administrators to delete a lecturer's account from the system.
 *     tags:
 *       - Lecturers
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the lecturer whose account will be deleted.
 *     responses:
 *       200:
 *         description: The lecturer's account has been successfully deleted.
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
 *                   example: 'Lecturer account deleted successfully'
 *       404:
 *         description: The lecturer was not found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete('/lecturer/id/:id', isAuthenticated, deleteLecturerAccount)
