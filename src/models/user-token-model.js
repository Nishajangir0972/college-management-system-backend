import mongoose from "mongoose";
import { ConfigData } from '../config/config.js';

export const userTokenTypes = {
    RESET_PASSWORD: 'reset-password'
}

const userTokenSchema = new mongoose.Schema(
    {
        token: {
            type: String,
            required: true,
            unique: true,
        },
        tokenType: {
            type: String,
            required: true,
        },
        user: {
            type: 'ObjectId',
            required: true
        }
    },
    {
        timestamps: true,
        versionKey: false,
        expireAfterSeconds: ConfigData.auth.resetPasswordTokenExpiry,
    });

const userTokenModel = mongoose.model("user_tokens", userTokenSchema)
export default userTokenModel;
