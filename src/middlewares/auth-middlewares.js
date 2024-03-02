import jwt from 'jsonwebtoken'
import { ConfigData } from '../config/config.js';

function authMiddleware(req, res, next) {
    let token = req.header('Authorization');
    if (!token) return res.status(401).json({ data: null, message: 'Access denied', errors: 'Authentication failed' });
    token = token.substring(7);
    try {
        const decoded = jwt.verify(token, ConfigData.auth.jwt.secretKey);
        console.log(decoded)
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ data: null, message: 'Access denied', errors: 'Invalid authentication token' });
    }
};

export default authMiddleware;