// schema to store student's data
import mongoose from "mongoose"
import validator from 'validator'
import type IStudent from "../interfaces/studentinterface"


const studentSchema = new mongoose.Schema({
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
    matricNumber: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        minlength: 8,
        maxlength: 8
    },
    level: {
        type: String,
        enum: ['100','200','300','400','500'],
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    images: {
        type: [String]
    }
})


const Student = mongoose.model<IStudent>('Student', studentSchema)
export default Student