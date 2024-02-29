import crypto from 'crypto';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { ConfigData } from '../config/config.js';
import { UnauthorisedException } from '../exceptions.js';
import studentModel from '../models/student-model.js';

// *********** Bcrypt Utilities Functions*************

export async function hashPassword(password) {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
}

export async function comparePasswords(plainPassword, hashedPassword) {
    return bcrypt.compare(plainPassword, hashedPassword);
}

// *********** JWT Utilities Functions*************
export function createJwtToken(payload) {
    const secreatKey = ConfigData.auth.jwt.secretKey;
    const expiresIn = ConfigData.auth.jwt.accessTokenExpiry;
    return jwt.sign(payload, secreatKey, { expiresIn });
}

export function verifyJwtToken(token) {
    try {
        const decoded = jwt.verify(token, secret);
        return decoded;
    } catch (error) {
        throw new UnauthorisedException('hi')
    }
}

// *********** Common utilities Functions*************
export function generateRandomString(length) {
    if (length <= 0) {
        throw new Error('Length must be a positive integer');
    }
    const randomBytes = crypto.randomBytes(Math.ceil(length / 2));
    const randomString = randomBytes.toString('base64').slice(0, length);
    return randomString;
}

export async function generateUniqueUsername(email, usernameFor) {
    const model = studentModel
    let username = email.split('@')[0];

    // Check if the username already exists
    const user = await model.findOne({ username })
    if (!user) {
        return username.toLowerCase();
    }

    let usernameTaken;
    const checkUsername = (username) => {
        return model.findOne({ username })
    }
    do {
        let suffix = `${Math.floor(1 + Math.random() * 9)}`;       // If the username exists, generate a suffix
        username = `${username}${suffix}`;
        usernameTaken = await checkUsername(username);
    } while (usernameTaken);

    return username.toLowerCase();
}

