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
        mobile: {
            type: Number,
            required: true,
        },
        alternativeMobile: {
            type: Number,
        },
        dob: {
            type: Date,
        },
        role:{
            type:Types.ObjectId,
            default:'65cf15c84b357911ac08e58a',
        }
    },
    {
        timestamps: true,
        versionKey: false
    });

const studentModel = mongoose.model("students", studentSchema)
export default studentModel;