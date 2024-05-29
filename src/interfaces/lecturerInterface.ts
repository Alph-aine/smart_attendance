import { type Document } from 'mongoose'

export default interface ILecturer extends Document {
    firstName?: string,
    lastName?: string,
    email?: string,
    password?: string,
    validatePassword: (password: string) => boolean
}