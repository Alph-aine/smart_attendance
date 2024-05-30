import { type Response } from 'express'
import type ILecturer from '../interfaces/lecturerInterface'

// create and send token in a cookie
const sendToken = (
  user: ILecturer,
  statusCode: number,
  res: Response
): void => {
  // create token
  const token = user.generateAuthToken()

  // cookie options
  const options = {
    expires: new Date(
      Date.now() +
        (parseInt(process.env.COOKIE_EXPIRE ?? '1') ?? 1) * 24 * 60 * 60 * 1000
    ),
    httpOnly: true
  }

  res.status(statusCode).cookie('token', token, options).json({
    success: true,
    token,
    user
  })
}

export default sendToken
