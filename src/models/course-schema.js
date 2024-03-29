import mongoose, { Schema } from "mongoose";

const courseSchema = new mongoose.Schema
    ({
        name: {
            type: String,
            required: true,
            unique: true
        },
        description: {
            type: String,
            required: true,
        },
        eligibility: {
            type: String,
            required: true,
        },
        opportunities: {
            type: [String],
            default: [],
        },
        images: {
            type: Schema.Types.Array,
            default: [],
        },
        department: {
            type: Schema.Types.ObjectId,
            required: true
        }
    }, {
        timestamps: true,
        versionKey: false
    })

const courseModel = mongoose.model('courses', courseSchema);
export default courseModel;