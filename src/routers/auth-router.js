import express from "express";
import { body, validationResult } from "express-validator";
import { UnauthorisedException, UnprocessableEntityException } from "../exceptions.js";
import { handleException } from "../common/common-helpers.js";
import studentService from "../services/student-service.js";
import { comparePasswords, createJwtToken, hashPassword } from "../common/utils.js";
import { ConfigData } from "../config/config.js";
import employeeService from "../services/employee-service.js";
import userTokenService from "../services/user-token-service.js";
import { isEmailUsed, isEmployeeEmailUsed } from "../common/validators.js";
import { userTokenTypes } from "../models/user-token-model.js";
import { sendEmail } from "../services/mail-service.js";

const authRouter = express.Router();

// For Login
authRouter.post('/student/login',
    [
        body('email').notEmpty().withMessage('Email is required'),
        body('password').notEmpty().withMessage('Password is required'),
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);  // Check for validation errors
            if (!errors.isEmpty()) {
                return res
                    .status(400)
                    .json({ data: null, errors: errors.array() });
            }
            const { email, password } = req.body;
            if (email && password) {
                const student = await studentService.findByEmail(email);
                if (!student) {
                    throw new UnauthorisedException({ path: 'email', msg: 'Invalid email' });
                }
                const validPassword = await comparePasswords(password, student.password)
                if (!validPassword) {
                    throw new UnauthorisedException({ path: 'password', msg: 'Incorrect password' });
                }
                const token = createJwtToken({ id: student._id, name: student.firstName, username: student.username, role: student.role, isEmployee: false })
                return res
                    .status(200)
                    .json({ message: 'Loggin successful', data: { token, tokenType: 'Bearer Token', expiresIn: `${ConfigData.auth.jwt.accessTokenExpiry}s` }, errors: [] })
            } else {
                throw new UnprocessableEntityException('Provide both fields')
            }
        } catch (error) {
            handleException(res, 'Login failed', error);
        }
    })

authRouter.post('/employee/login',
    [
        body('email')
            .notEmpty().withMessage('Email is required')
            .isEmail().withMessage('Enter valid email'),
        body('password').notEmpty().withMessage('Password is required'),
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);  // Check for validation errors
            if (!errors.isEmpty()) {
                return res
                    .status(400)
                    .json({ data: null, errors: errors.array() });
            }
            const { email, password } = req.body;
            if (email && password) {
                const employee = await employeeService.findByEmail(email);
                if (!employee) {
                    throw new UnauthorisedException({ path: 'email', msg: 'Invalid email' });
                }
                const validPassword = await comparePasswords(password, employee.password)
                if (!validPassword) {
                    throw new UnauthorisedException({ path: 'password', msg: 'Incorrect password' });
                }
                const token = createJwtToken({ id: employee._id, name: employee.firstName, username: employee.username, role: employee.role, isEmployee: true })
                return res
                    .status(200)
                    .json({ message: 'Loggin successful', data: { token, tokenType: 'Bearer Token', expiresIn: `${ConfigData.auth.jwt.accessTokenExpiry}s` }, errors: [] })
            } else {
                throw new UnprocessableEntityException('Provide both fields')
            }
        } catch (error) {
            handleException(res, 'Login failed', error);
        }
    })

/*---------------For Password Reset Student--------------------*/
authRouter.post(
    '/student/reset-password',
    [
        body('email').notEmpty().withMessage('Email is required')
            .custom(async (email) => {
                const isUsed = await isEmailUsed(email);
                if (!isUsed) {
                    throw new Error('No User Exists with this email');
                }
                return true;
            }).withMessage('No student found with this email'),
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res
                    .status(400)
                    .json({ data: null, errors: errors.array() });
            }
            const user = await studentService.findByEmail(req.body.email);
            const generatedToken = await userTokenService.saveToken(user._id.toString(), userTokenTypes.RESET_PASSWORD);
            try {
                await sendEmail(user.email, 'Reset-Password', 'reset-password', { name: user.firstName, resetPasswordLink: `${ConfigData.frontend.baseUrl}/student/reset-password/${generatedToken.token}` })
                res.status(200).json({ data: null, message: 'Password reset email sent' })
            } catch (error) {
                await userTokenService.delete(generatedToken.token)
                res.status(500).json({ data: null, message: 'Failed to send reset password email' })
            }
        }
        catch (error) {
            handleException(res, 'Request Failed', error);
        }
    })

authRouter.post(
    '/student/reset-password/:resetPasswordToken',
    [
        body('newPassword').notEmpty().withMessage('New password cannot be empty'),
        body('cnfPassword').notEmpty().withMessage('Confirm password must not be empty'),
        body('cnfPassword').custom((inp, meta) => {
            if (
                meta.req.body.newPassword
                && meta.req.body.cnfPassword
                && meta.req.body.newPassword !== meta.req.body.cnfPassword) {
                return false;
            }
            return true;
        }).withMessage('Confirm Password must be similar to new password')
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);  // Check for validation errors
            if (!errors.isEmpty()) {
                return res
                    .status(400)
                    .json({ data: null, errors: errors.array() });
            }
            const token = req.params.resetPasswordToken;
            const tokenDocument = await userTokenService.findByToken(token);
            if (!tokenDocument) {
                throw new UnprocessableEntityException('Either reset password link has expired or is invalid.')
            }
            const user = await studentService.findById(tokenDocument.user);
            const newHashedPassword = await hashPassword(req.body.newPassword);
            await studentService.updateStudent(user._id.toString(), { password: newHashedPassword });
            await userTokenService.delete(token);
            return res
                .status(202)
                .json({ data: null, message: 'Password Successfully Updated' });
        }
        catch (error) {
            handleException(res, 'Request Failed', error);
        }
    })

/*---------------For Password Reset Employee--------------------*/
authRouter.post(
    '/employee/reset-password',
    [
        body('email').notEmpty().withMessage('Email is required')
            .custom(async (email) => {
                const isUsed = await isEmployeeEmailUsed(email);
                if (!isUsed) {
                    throw new Error('No User Exists with this email');
                }
                return true;
            }).withMessage('No Employee found with this email'),
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);  // Check for validation errors
            if (!errors.isEmpty()) {
                return res
                    .status(400)
                    .json({ data: null, errors: errors.array() });
            }
            const user = await employeeService.findByEmail(req.body.email);
            const generatedToken = await userTokenService.saveToken(user._id.toString(), userTokenTypes.RESET_PASSWORD);
            try {
                await sendEmail(user.email, 'Reset-Password', 'reset-password', { name: user.firstName, resetPasswordLink: `${ConfigData.frontend.baseUrl}/employee/reset-password/${generatedToken.token}` })
                res.status(200).json({ data: null, message: 'Password reset email sent', errors: [] })
            } catch (error) {
                await userTokenService.delete(generatedToken.token)
                res.status(500).json({ data: null, message: 'Failed to send reset password email', errors: [] })
            }
        }
        catch (error) {
            handleException(res, 'Request Failed', error);
        }
    })

authRouter.post(
    '/employee/reset-password/:resetPasswordToken',
    [
        body('newPassword').notEmpty().withMessage('New password cannot be empty'),
        body('cnfPassword').notEmpty().withMessage('Confirm password must not be empty'),
        body('cnfPassword').custom((inp, meta) => {
            if (
                meta.req.body.newPassword
                && meta.req.body.cnfPassword
                && meta.req.body.newPassword !== meta.req.body.cnfPassword) {
                return false;
            }
            return true;
        }).withMessage('Confirm Password must be similar to new password')
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);  // Check for validation errors
            if (!errors.isEmpty()) {
                return res
                    .status(400)
                    .json({ data: null, errors: errors.array() });
            }
            const token = req.params.resetPasswordToken;
            const tokenDocument = await userTokenService.findByToken(token);
            if (!tokenDocument) {
                throw new UnprocessableEntityException('Either reset password link has expired or is invalid.')
            }
            const user = await employeeService.findById(tokenDocument.user);
            const newHashedPassword = await hashPassword(req.body.newPassword);
            await employeeService.updateEmployee(user._id.toString(), { password: newHashedPassword });
            await userTokenService.delete(token);
            return res
                .status(202)
                .json({ data: null, message: 'Password Successfully Updated', errors: [] });
        }
        catch (error) {
            handleException(res, 'Request Failed', error);
        }
    })

export default authRouter;