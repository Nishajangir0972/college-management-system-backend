import * as crypto from 'crypto';
import userTokenModel from "../models/user-token-model.js";

class userTokenService {
    constructor() { }

    async saveToken(userId, tokenType) {
        const token = crypto.randomBytes(32).toString('hex');
        const savedToken = new userTokenModel({ user: userId, tokenType, token })
        await savedToken.save();
        return savedToken;
    }

    async findByToken(token) {
        const tokenDocument = await userTokenModel.findOne({ token: token })
        return tokenDocument;
    }

    async findByTokenAndTokenType(token, tokenType) {
        const tokenDocument = await userTokenModel.findOne({ token: token, tokenType: tokenType })
        return tokenDocument;
    }

    async delete(token) {
        const tokenDocument = await userTokenModel.findOneAndDelete({ token: token })
        return tokenDocument;
    }
}
export default new userTokenService();