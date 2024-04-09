import express from "express";
import { body, validationResult } from "express-validator"
import { getPaginationQuery, handleException } from "../common/common-helpers.js";
import employeeService from "../services/employee-service.js";
import { generateRandomString, generateUniqueUsername, hashPassword } from "../common/utils.js";
import { Types, isValidObjectId } from "mongoose";
import { UnprocessableEntityException } from "../exceptions.js";
import { sendEmail } from "../services/mail-service.js";
import employeeModel from "../models/employee-model.js";
import { validateEmployeeCreation, validateEmployeeUpdate } from "../middlewares/validation-middlewares.js";

const employeeRouter = express.Router();


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
            console.log(error);
            return res.status(202).json({ data: newEmployee, message: 'Employee account created .Email sending is pending. Please Check your email later.' })
        }
        return res.status(202).json({ data: newEmployee, message: 'Employee created successfully' });
    } catch (error) {
        return handleException(res, 'Failed to create employee', error);
    }
})

employeeRouter.get('/get/:employeeId', async (req, res) => {
    try {
        let employeeId = req.params.employeeId;
        const isValidId = isValidObjectId(employeeId)
        if (!isValidId) {
            throw new UnprocessableEntityException({ path: 'employeeId', msg: 'InvalidId' })
        }
        const employee = await employeeService.findEmployeeDetailsById(employeeId);
        if (employee) {
            return res.status(200).json({ data: employee, message: 'Employee fetched', errors: [] });
        }
        return res.status(404).json({ data: null, message: 'Employee not found', errors: 'Employee not found' })
    } catch (error) {
        return handleException(res, 'Failed to fetch employee', error)
    }
})


employeeRouter.get('/getall', async (req, res) => {
    try {
        const { page, limit, sort } = getPaginationQuery(req.query)
        const employees = await employeeService.findAllEmployeesPaginated(page, limit, sort);
        return res.status(200).json({ data: employees, message: 'Employees fetched', errors: [] });
    } catch (error) {
        return handleException(res, 'Failed to fetch employees', error);
    }
})


employeeRouter.patch('/update/:employeeId', validateEmployeeUpdate, async (req, res) => {
    try {
        let employeeId = req.params.employeeId;
        const isValidId = isValidObjectId(employeeId)
        if (!isValidId) {
            throw new UnprocessableEntityException({ path: 'employeeId', msg: 'InvalidId' })
        }
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ data: null, errors: errors.array() });
        }
        let data = req.body;
        delete data.password;
        data.username;
        const updatedEmployee = await employeeService.updateEmployee(employeeId,data);
        if (updatedEmployee) {
            return res.status(202).json({ data: updatedEmployee, message: 'Employee updated successfully' });
        }
        return res.status(404).json({ data: null, message: 'Employee not found', errors: 'Employee not found' })
    } catch (error) {
        console.log(error);
        return handleException(res, 'Failed to update employee', error)
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

