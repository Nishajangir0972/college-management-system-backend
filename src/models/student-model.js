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
        },
        photo: {
            type: String,
        },
        bio: {
            type: String,
        },
        idProof: {
            type: String,
        },
        signature: {
            type: String,
        },
        address: {
            type: Object,
        },
        permanentAddress: {
            type: Object,
        },
    },
    {
        timestamps: true,
        versionKey: false
    });

const studentModel = mongoose.model("students", studentSchema)
export default studentModel;