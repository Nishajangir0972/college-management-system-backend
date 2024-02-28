import express from "express";
import { body, validationResult } from "express-validator";
import { UnauthorisedException, UnprocessableEntityException } from "../exceptions.js";
import { handleException } from "../common/common-helpers.js";
import studentService from "../services/student-service.js";
import { comparePasswords, createJwtToken } from "../common/utils.js";
import { ConfigData } from "../config/config.js";
import employeeService from "../services/employee-service.js";

const authRouter = express.Router();

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
                const validPassword = comparePasswords(password, student.password)
                if (!validPassword) {
                    throw new UnauthorisedException({ path: 'password', msg: 'Incorrect password' });
                }
                const token = createJwtToken({ id: student._id, name: student.firstName, username: student.username, role: student.role })
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
                const employee = await employeeService.findByEmail(email);
                if (!employee) {
                    throw new UnauthorisedException({ path: 'email', msg: 'Invalid email' });
                }
                const validPassword = comparePasswords(password, employee.password)
                if (!validPassword) {
                    throw new UnauthorisedException({ path: 'password', msg: 'Incorrect password' });
                }
                const token = createJwtToken({ id: employee._id, name: employee.firstName, username: employee.username, role: employee.role })
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




export default authRouter;