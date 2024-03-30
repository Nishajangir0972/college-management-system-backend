import express from "express";
import { validationResult } from "express-validator";
import { getPaginationQuery, handleException } from "../common/common-helpers.js";
import studentService from "../services/student-service.js";
import { generateRandomString, generateUniqueUsername, hashPassword } from "../common/utils.js";
import { isValidObjectId } from "mongoose";
import { UnprocessableEntityException } from "../exceptions.js";
import { sendEmail } from "../services/mail-service.js";
import authMiddleware from "../middlewares/auth-middlewares.js";
import roleMiddleware from "../middlewares/role-middleware.js";
import roleService from "../services/role-service.js";
import { validateStudentCreation, validateStudentDataUpdation } from "../middlewares/validation-middlewares.js";
// import { omit as _omit } from 'lodash';

const studentRouter = express.Router();
studentRouter.use(authMiddleware);


studentRouter.post('/create', roleMiddleware.bind(null, 'student.student.create'), validateStudentCreation, async (req, res) => {
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
        const studentRoleId = await roleService.findByname('STUDENT')
        data.role = studentRoleId._id
        let newStudent = await studentService.createStudent(req.body)
        // newStudent = _omit(newStudent.toObject(), ['password']);
        try {
            await sendEmail(data.email, 'Welcome to College Portal', 'new-student-create', { name: data.firstName, username, password: randomPassword, collegePortalLink: 'https://www.tagore-pg-college.com' })
        } catch (error) {
            return res.status(201).json({ data: newStudent, message: 'Student account created. Email sending is pending. Please check your email later.' })
        }
        return res.status(201).json({ data: newStudent, message: 'Student created successfully' });
    } catch (error) {
        handleException(res, 'Failed to create student', error);
    }
});

studentRouter.get('/get/:studentId', roleMiddleware.bind(null, 'student.student.read'), async (req, res) => {
    try {
        let studentId = req.params.studentId;
        const isValidId = isValidObjectId(studentId)
        if (!isValidId) {
            throw new UnprocessableEntityException({ path: 'studentId', msg: 'Invalid id' })
        }
        const student = await studentService.findStudentDataById(studentId)
        if (student[0]) {
            return res.status(200).json({ data: student, message: 'Student fetched', errors: [] });
        }
        return res.status(404).json({ data: null, message: 'Student not found', errors: 'Student not found' });
    } catch (error) {
        return handleException(res, 'Failed to fetch student', error);
    }
})

studentRouter.get('/getall', roleMiddleware.bind(null, 'student.student.read'), async (req, res) => {
    try {
        const { page, limit, sort } = getPaginationQuery(req.query)
        const students = await studentService.findAllStudentsPaginated(page, limit, sort);
        return res.status(200).json({ data: students, message: 'Students fetched', errors: [] });
    } catch (error) {
        console.log(error);
        return handleException(res, 'Failed to fetch students', error);
    }
})

studentRouter.patch('/update/:studentId', roleMiddleware.bind(null, 'student.student.update'), validateStudentDataUpdation, async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ data: null, errors: errors.array() });
        }
        let studentId = req.params.studentId;
        const isValidId = isValidObjectId(studentId)
        if (!isValidId) {
            throw new UnprocessableEntityException({ path: 'studentId', msg: 'Invalid id' })
        }
        let data = req.body;
        delete data.email
        delete data.password;
        delete data.username;
        const updatedStudent = await studentService.updateStudent(studentId, data)
        if (updatedStudent) {
            return res.status(202).json({ data: updatedStudent, message: 'Student updated successfully' });
        }
        return res.status(404).json({ data: null, message: 'Student not found', errors: 'Student not found' });
    } catch (error) {
        return handleException(res, 'Failed to update student', error);
    }
})

studentRouter.delete('/delete/:studentId', roleMiddleware.bind(null, 'student.student.delete'), async (req, res) => {
    try {
        let studentId = req.params.studentId;
        const isValidId = isValidObjectId(studentId)
        if (!isValidId) {
            throw new UnprocessableEntityException({ path: 'studentId', msg: 'Invalid id' })
        }
        const student = await studentService.deleteStudent(studentId);
        if (student) {
            return res.status(200).json({ data: null, message: 'Student deleted', errors: [] });
        }
        return res.status(404).json({ data: null, message: 'Student not found', errors: 'Student not found' });
    } catch (error) {
        return handleException(res, 'Failed to fetch student', error);
    }
})

// const profileUpdateValidator = [

// ]
// studentRouter.patch('/update-profile', profileUpdateValidator, async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(400).json({ data: null, errors: errors.array() });
//     }
//     console.log("reqaayi");
// })


// const loginCredentialValidator = [

// ]
// studentRouter.patch('/update-login-credentials', async (req, res) => {
//     console.log("reqaayi");
// })

export default studentRouter;