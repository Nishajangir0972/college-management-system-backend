import express from "express";
import { body, validationResult } from "express-validator"
import { handleException } from "../common/common-helpers.js";
import employeeService from "../services/employee-service.js";
import { generateRandomString, generateUniqueUsername, hashPassword } from "../common/utils.js";
import { Types } from "mongoose";
import { UnprocessableEntityException } from "../exceptions.js";
import { isEmailUsed } from "../common/validators.js";
import { sendEmail } from "../services/mail-service.js";
import employeeModel from "../models/employee-model.js";

const employeeRouter = express.Router();



const validateEmployeeCreation = [
    body('firstName')
        .notEmpty().withMessage('First name is required'),
    body('mobile')
        .notEmpty().withMessage('Mobile Number is required')
        .isNumeric().withMessage('Mobile must be a number'),
    body('email')
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Invalid email format')
        .custom(async (email) => {
            const isUsed = await isEmailUsed(email);
            if (isUsed) {
                throw new Error('Email is already taken');
            }
            return true;
        }).withMessage('Email is already taken'),

];

employeeRouter.post("/create", validateEmployeeCreation, async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ data: null, errors: errors.array() })
        }
        let data = req.body;
        const randomPassword = generateRandomString(20)
        const username = await generateUniqueUsername(data.email)
        data.password = await hashPassword(randomPassword)
        data.username = username;
        const newEmployee = await employeeService.createEmployee(req.body)
        try {
            await sendEmail(data.email, 'Welcome to College Portal', 'new-employee-create', { name: data.firstName, username, password: randomPassword, collegePortalLink: 'www.tagore-pg-college.com' })

        } catch (error) {
            res.status(202).json({ data: newEmployee, message: 'Employee account created .Email sending is pending. Please Check your email later.' })
        }
        res.status(202).json({ data: newEmployee, message: 'Employee created successfully' });
    } catch (error) {
        handleException(res, 'Failed to create employee', error);
    }
})

employeeRouter.get('/get/:employeeId', async (req, res) => {
    try {
        let employeeId = req.params.employeeId;
        try {
            employeeId = new Types.ObjectId(employeeId);
        } catch (error) {
            throw new UnprocessableEntityException({ path: 'employeeId', msg: 'InvalidId' })
        }

        const employee = await employeeModel.findById(employeeId, { password: 0 })
        if (employee) {
            res.status(200).json({ data: employee, message: 'Employee fetched', errors: [] });
        }
        res.status(404).json({ data: null, message: 'Employee not found', errors: 'Employee not found' })
    } catch (error) {
        handleException(res, 'Failed to fetch employee', error)
    }
})


employeeRouter.get('/getall', async (req, res) => {
    try {
        let employeeId = req.params.employeeId;
        try {
            employeeId = new Types.ObjectId(employeeId);
        } catch (error) {
            throw new UnprocessableEntityException({ path: 'employeeId', msg: 'InvalidId' })
        }
        const employee = await employeeModel.find({}, { password: 0 })
        res.status(200).json({ data: employee, message: 'Employee Fetched', errors: [] })
    } catch (error) {
        handleException(res, 'Failed to fetch employee', error)
    }
})


employeeRouter.patch('/update/:id', validateEmployeeCreation, async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ data: null, errors: errors.array() });
        }
        let data = req.body;
        delete data.password;
        data.username;
        const updatedEmployee = await employeeService.createEmployee(req.body)
        res.status(202).json({ data: updatedEmployee, message: 'Employee updated successfully' });
    } catch (error) {
        handleException(res, 'Failed to update employee', error)
    }
})


employeeRouter.delete('/delete/:employeeId', async (req, res) => {
    try {
        let employeeId = req.params.employeeId;
        try {
            employeeId = new Types.ObjectId(employeeId);
        } catch (error) {
            throw new UnprocessableEntityException({ path: 'EmployeeId', msg: 'Invalidid' })
        }
        const employee = await employeeModel.findByIdAndDelete(employeeId, { new: true })
        if (employee) {
            res.status(200).json({ data: null, message: 'Employee deleted', errors: [] });
        }
        res.status(404).json({
            data: null,
            message: 'Employee not found', errors: 'Employee not found'
        })
    } catch (error) {
        handleException(res, 'Failed to fetch employee', error)
    }
})
// employeeRouter.get('/', async (req, res) => {
//     const data = await employeeModel.find();
//     res.json({ message: "hello", data })
// })

export default employeeRouter;

