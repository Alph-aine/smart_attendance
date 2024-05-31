import { type Document } from 'mongoose'

export default interface ILecturer extends Document {
  firstName?: string
  lastName?: string
  email?: string
  password?: string
  otp: string
  otpExpire: Date
  validatePassword: (password: string) => boolean
  generateAuthToken: () => string
  generateOtp: () => string
}
