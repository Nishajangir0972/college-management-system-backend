import mongoose, { Types } from "mongoose";

const classSchema = new mongoose.Schema
    ({
        name: {
            type: String,
            required: true,
            unique: true
        },
        department: {
            type: Types.ObjectId,
            required: true
        }
    }, {
        timestamps: true,
        versionKey: false
    })

const classModel = mongoose.model('classes', classSchema)
export default classModel;