/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express'
import {
  registerStudent,
  lecturerSignUp,
  lecturerLogIn,
  forgotPassword,
  resetPassword
} from '../controllers/authC'

const router = express.Router()

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new student
 *     description: Registers a new student with their details
 *     tags:
 *        - Student
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - email
 *               - matricNumber
 *               - level
 *               - gender
 *               - images
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               matricNumber:
 *                 type: string
 *               level:
 *                 type: string
 *               gender:
 *                 type: string
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Student data stored successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       400:
 *         description: Student already exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.post('/register', registerStudent)

/**
 * @swagger
 * /lecturer/signup:
 *   post:
 *     summary: Sign up a new lecturer
 *     description: Signs up a new lecturer with their credentials
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - email
 *               - password
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Lecturer signed up successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 token:
 *                   type: string
 *       400:
 *         description: Lecturer already exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.post('/lecturer/signup', lecturerSignUp)

/**
 * @swagger
 * /lecturer/login:
 *   post:
 *     summary: Log in a lecturer
 *     description: Authenticates a lecturer with their email and password
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 token:
 *                   type: string
 *       400:
 *         description: Missing email or password
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       401:
 *         description: Invalid email or password
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.post('/lecturer/login', lecturerLogIn)

/**
 * @swagger
 * /lecturer/forgotpassword:
 *   post:
 *     summary: Initiates the password reset process for a lecturer
 *     description: Allows a lecturer to initiate the password reset process by providing their email. An OTP will be generated and sent to the lecturer's email.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The email address of the lecturer requesting the password reset.
 *     responses:
 *       200:
 *         description: The OTP has been sent successfully.
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
 *                   example: 'OTP sent successfully'
 *       404:
 *         description: The lecturer was not found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: An error occurred while processing the request.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/lecturer/forgotpassword', forgotPassword)

/**
 * @swagger
 * /lecturer/reset:
 *   put:
 *     summary: Resets a lecturer's password
 *     description: Allows a lecturer to reset their password using an OTP received via email. The lecturer must also confirm their new password.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *                 description: The new password for the lecturer's account.
 *               confirmPassword:
 *                 type: string
 *                 description: Confirmation of the new password.
 *               otp:
 *                 type: string
 *                 description: The OTP received by the lecturer's email for password reset.
 *     responses:
 *       200:
 *         description: The password has been successfully reset.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 token:
 *                   type: string
 *                   example: 'JWT Token'
 *       400:
 *         description: Invalid OTP or passwords do not match.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: An error occurred while processing the request.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.put('/lecturer/reset', resetPassword)
export default router
