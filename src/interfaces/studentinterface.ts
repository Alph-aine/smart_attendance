import { type Document } from 'mongoose'

export default interface IStudent extends Document {
  firstName?: string
  lastName?: string
  email?: string
  matricNumber?: string
  level?: string
  gender?: string
  images?: [string]
}
