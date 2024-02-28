import express from "express";
import { body, validationResult } from "express-validator";
import { handleException } from "../common/common-helpers.js";
import studentService from "../services/student-service.js";
import { generateRandomString, generateUniqueUsername, hashPassword } from "../common/utils.js";

const studentRouter = express.Router();

// Validation middleware
const validateStudentCreation = [
    body('firstName').notEmpty().withMessage('First name is required'),
    body('email').notEmpty().withMessage('Email is required').isEmail(),
    body('mobile').notEmpty().withMessage('Mobile Number is required').isNumeric(),
];
studentRouter.post('/create', validateStudentCreation, async (req, res) => {
    try {
        const errors = validationResult(req);           // Check for validation errors
        if (!errors.isEmpty()) {
            return res.status(400).json({ data: null, errors: errors.array() });
        }
        let data = req.body;
        data.password = await hashPassword(generateRandomString(10))
        // data.username = await generateUniqueUsername(data.email)
        const newStudent = await studentService.createStudent(req.body)
        res.status(201).json({ data: newStudent, message: 'Student created successfully' });
    } catch (error) {
        handleException(res, 'Failed to create student', error);
    }
})

export default studentRouter;