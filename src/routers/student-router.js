import express from "express";
import { body, validationResult } from "express-validator";
import { handleException } from "../common/common-helpers.js";
import studentService from "../services/student-service.js";
import { generateRandomString, generateUniqueUsername, hashPassword } from "../common/utils.js";
import { Types } from "mongoose";
import { UnprocessableEntityException } from "../exceptions.js";
import studentModel from "../models/student-model.js";
import { isEmailUsed } from "../common/validators.js";
import { sendEmail } from "../services/mail-service.js";
import authMiddleware from "../middlewares/auth-middlewares.js";
import roleMiddleware from "../middlewares/role-middleware.js";

const studentRouter = express.Router();
studentRouter.use(authMiddleware);


const validateStudentCreation = [
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
studentRouter.post('/create',roleMiddleware.bind(null,'student.create'), validateStudentCreation, async (req, res) => {
    try {
        const errors = validationResult(req);           // Check for validation errors
        if (!errors.isEmpty()) {
            return res.status(400).json({ data: null, errors: errors.array() });
        }
        let data = req.body;
        const randomPassword = generateRandomString(20)
        const username = await generateUniqueUsername(data.email)
        data.password = await hashPassword(randomPassword)
        data.username = username;
        const newStudent = await studentService.createStudent(req.body)
        try {
            await sendEmail(data.email, 'Welcome to College Portal', 'new-student-create', { name: data.firstName, username, password: randomPassword, collegePortalLink: 'www.tagore-pg-college.com' })
        } catch (error) {
            res.status(202).json({ data: newStudent, message: 'Student account created. Email sending is pending. Please check your email later.' })
        }
        res.status(202).json({ data: newStudent, message: 'Student created successfully' });
    } catch (error) {
        handleException(res, 'Failed to create student', error);
    }
});


studentRouter.get('/get/:studentId', async (req, res) => {
    try {
        let studentId = req.params.studentId;
        try {
            studentId = new Types.ObjectId(studentId);
        } catch (error) {
            throw new UnprocessableEntityException({ path: 'studentId', msg: 'Invalid id' })
        }
        const student = await studentModel.findById(studentId, { password: 0 })
        if (student) {
            res.status(200).json({ data: student, message: 'Student fetched', errors: [] });
        }
        res.status(404).json({ data: null, message: 'Student not found', errors: 'Student not found' });
    } catch (error) {
        handleException(res, 'Failed to fetch student', error);
    }
})


studentRouter.get('/getall', async (req, res) => {
    try {
        let studentId = req.params.studentId;
        try {
            studentId = new Types.ObjectId(studentId);
        } catch (error) {
            throw new UnprocessableEntityException({ path: 'studentId', msg: 'Invalid id' })
        }
        const student = await studentModel.find({}, { password: 0 })
        res.status(200).json({ data: student, message: 'Students fetched', errors: [] });
    } catch (error) {
        handleException(res, 'Failed to fetch student', error);
    }
})


studentRouter.patch('/update/:id', validateStudentCreation, async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ data: null, errors: errors.array() });
        }
        let data = req.body;
        delete data.password;
        data.username;
        const updatedStudent = await studentService.createStudent(req.body)
        res.status(202).json({ data: updatedStudent, message: 'Student updated successfully' });
    } catch (error) {
        handleException(res, 'Failed to update student', error);
    }
})


studentRouter.delete('/delete/:studentId', async (req, res) => {
    try {
        let studentId = req.params.studentId;
        try {
            studentId = new Types.ObjectId(studentId);
        } catch (error) {
            throw new UnprocessableEntityException({ path: 'studentId', msg: 'Invalid id' })
        }
        const student = await studentModel.findByIdAndDelete(studentId, { new: true })
        if (student) {
            res.status(200).json({ data: null, message: 'Student deleted', errors: [] });
        }
        res.status(404).json({ data: null, message: 'Student not found', errors: 'Student not found' });
    } catch (error) {
        handleException(res, 'Failed to fetch student', error);
    }
})

export default studentRouter;