import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema
    ({
        name: {
            type: String,
            required: true,
            unique: true
        }
    }, {
        timestamps: true,
        versionKey: false
    })

const departmentModel = mongoose.model('departments', departmentSchema)
export default departmentModel;