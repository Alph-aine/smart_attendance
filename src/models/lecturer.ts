// Schema for storing Lecturer's data
import mongoose from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import randomstring from 'randomstring'
import type ILecturer from '../interfaces/lecturerInterface'

const lecturerSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 50
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 50
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      validate: [validator.isEmail, 'Enter a valid email address']
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
      maxlength: 1024,
      select: false
    },
    otp: {
      type: String,
      trim: true,
      default: null
    },
    otpExpire: Date
  },
  { timestamps: true }
)

// hash password before saving
lecturerSchema.pre('save', async function (this: ILecturer, next) {
  if (this.isModified('password') && this.password !== undefined) {
    this.password = await bcrypt.hash(this.password, 8)
  }
  next()
})

// validate inserted password against hashed password
lecturerSchema.methods.validatePassword = async function (
  insertedPassword: string
) {
  return await bcrypt.compare(insertedPassword, this.password as string)
}

// generate jwt token for authentication
lecturerSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ id: this._id }, process.env.JWT_SECRET ?? 'secret', {
    expiresIn: process.env.JWT_EXPIRE ?? '2h'
  })
  return token
}

// generate otp
lecturerSchema.methods.generateOtp = function () {
  const otp = randomstring.generate({
    length: 6,
    charset: 'numeric'
  })
  this.otp = otp
  this.otpExpire = Date.now() + 10 * 60 * 1000 // 10 minutes

  return otp
}

const Lecturer = mongoose.model<ILecturer>('Lecturer', lecturerSchema)
export default Lecturer
