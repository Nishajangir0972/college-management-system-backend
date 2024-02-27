import mongoose, { Types } from "mongoose";

const studentSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
        },
        username: {
            type: String,
            required: true,
            unique: true,
        },
        fName: {
            type: String,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        mobile1: {
            type: Number,
            required: true,
        },
        mobile2: {
            type: Number,
        },
        dob: {
            type: Date,
        },
        role:{
            type:Types.ObjectId,
            default:'student',
        }
    },
    {
        timestamps: true,
        versionKey: false
    });

const studentModel = mongoose.model("students", studentSchema)
export default studentModel;