import { body } from "express-validator";
import { isClassIdExists, isCourseNameExists, isDepartmentIdExists, isEmailUsed } from "../common/validators.js";
import studentService from "../services/student-service.js";

// ***********************FOR-Students-ROUTER************************** //
export const validateStudentCreation = [
    body('firstName')
        .notEmpty().withMessage('First name is required'),
    body('mobile')
        .notEmpty().withMessage('Mobile Number is required')
        .isNumeric().withMessage('Mobile must be a number'),
    body('class')
        .notEmpty().withMessage('Class is required')
        .isMongoId().withMessage('Must be a valid Class')
        .custom(async (value) => {
            const classExists = await isClassIdExists(value);
            if (!classExists) {
                throw new Error('Class doesnt exists');
            }
            return true;
        }).withMessage(`Class doesn't exists`),
    body('department')
        .notEmpty().withMessage('Department is required')
        .isMongoId().withMessage('Must be a valid department')
        .custom(async (value) => {
            const departmentExists = await isDepartmentIdExists(value);
            if (!departmentExists) {
                throw new Error('Department doesnt exists');
            }
            return true;
        }).withMessage(`Department doesn't exists`),
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

export const validateStudentDataUpdation = [
    body('firstName')
        .notEmpty().withMessage('First name is required'),
    body('mobile')
        .notEmpty().withMessage('Mobile Number is required')
        .isNumeric().withMessage('Mobile must be a number'),
    body('class')
        .notEmpty().withMessage('Class is required')
        .isMongoId().withMessage('Must be a valid Class')
        .custom(async (value) => {
            const classExists = await isClassIdExists(value);
            if (!classExists) {
                throw new Error('Class doesnt exists');
            }
            return true;
        }).withMessage(`Class doesn't exists`),
    body('department')
        .notEmpty().withMessage('Department is required')
        .isMongoId().withMessage('Must be a valid department')
        .custom(async (value) => {
            const departmentExists = await isDepartmentIdExists(value);
            if (!departmentExists) {
                throw new Error('Department doesnt exists');
            }
            return true;
        }).withMessage(`Department doesn't exists`),
    body('email')
        .optional()
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Invalid email format')
        .custom(async (email, { req }) => {
            const isUsed = await studentService.findByEmail(email);
            if (isUsed && isUsed?._id?.toString() !== req.params.studentId) {
                throw new Error('Email is already taken');
            }
            return true;
        }).withMessage('Email is already taken'),
];
// ***********************FOR-COURSES-ROUTER************************** //
export const validatecourseCreation = [
    body('department')
        .notEmpty().withMessage('Department is required')
        .isMongoId().withMessage('Must be a valid department')
        .custom(async (id) => {
            const validDepartment = await isDepartmentIdExists(id);
            if (!validDepartment) {
                throw new Error('Department not found')
            }
            return true;
        }).withMessage('Department not found'),
    body('name')
        .notEmpty().withMessage('Course name is required')
        .custom(async (name) => {
            const isAlreadyExists = await isCourseNameExists(name);
            if (isAlreadyExists) {
                throw new Error('Course already exists')
            }
            return true;
        }).withMessage('Course already exists'),
    body('description')
        .notEmpty().withMessage('Course description is required'),
    body('eligibility')
        .notEmpty().withMessage('Course description is required'),
    body('opportunities')
        .isArray().withMessage('Must be valid'),
];