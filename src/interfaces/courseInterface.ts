import { type Document } from 'mongoose'
import type mongoose from 'mongoose'

export default interface ICourse extends Document {
  courseName?: string
  courseCode?: string
  level?: string
  day?: string
  time?: string
  lecturer?: mongoose.Schema.Types.ObjectId
}
