import mongoose from "mongoose";

const roleSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        isSuperAdmin: {
            type: Boolean,
            default: false,
        },
        permissions: {
            type: Array,
            default: []
        }
    },
    {
        timestamps: true,
        versionKey: false
    });

const roleModel = mongoose.model("roles", roleSchema)
export default roleModel;