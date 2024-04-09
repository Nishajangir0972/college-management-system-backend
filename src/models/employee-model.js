import mongoose, { Types } from "mongoose";

const employeeSchema = new mongoose.Schema(
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
        department: {
            type: Types.ObjectId,
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
        designation: {
            type: Types.ObjectId,
            // required: true
        },
        address: {
            type: Object,
        },
        permanentAddress: {
            type: Object,
        },
        role: {
            type: Types.ObjectId,
            required: true
        }
    },
    {
        timestamps: true,
        versionKey: false
    });

const employeeModel = mongoose.model("employees", employeeSchema)
export default employeeModel;