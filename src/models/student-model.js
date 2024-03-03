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
        fathersName: {
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
        role: {
            type: Types.ObjectId,
            default: '65cf15c84b357911ac08e58a',
        },
        department: {
            type: Types.ObjectId,
            required: true
        },
        class: {
            type: Types.ObjectId,
            required: true
        }
    },
    {
        timestamps: true,
        versionKey: false
    });

const studentModel = mongoose.model("students", studentSchema)
export default studentModel;