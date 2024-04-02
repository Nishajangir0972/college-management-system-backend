import { body } from "express-validator";
import { isClassIdExists, isClassNameExists, isCourseNameExists, isDepartmentIdExists, isDepartmentNameExists, isEmailUsed, isRoleNameExists } from "../common/validators.js";
import studentService from "../services/student-service.js";
import classModel from "../models/class-model.js";
import roleService from "../services/role-service.js";
import departmentService from "../services/department-service.js";

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


// ***********************FOR-Classes-ROUTER************************** //
export const validateClassCreation = [
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
    body('name')
        .notEmpty().withMessage('Class name is required')
        .toUpperCase()
        .custom(async (name) => {
            const isAlreadyExists = await isClassNameExists(name);
            if (isAlreadyExists) {
                throw new Error('Class already exists')
            }
            return true;
        }).withMessage('Class already exists'),
];
export const validateClassUpdate = [
    body('name')
        .notEmpty().withMessage('Class name is required')
        .toUpperCase()
        .custom(async (name, { req }) => {
            const isAlreadyExists = await classModel.findOne({ name });
            if (isAlreadyExists && isAlreadyExists?._id?.toString() !== req.params.classId) {
                throw new Error('Class already exists')
            }
            return true;
        }).withMessage('Class already exists'),
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


// ***********************FOR-ROLES-ROUTER************************** //
export const validateCreateRole = [
    body('name')
        .isString()
        .notEmpty().withMessage('Name is required')
        .custom(async (name) => {
            const isUsed = await isRoleNameExists(name.toUpperCase());
            if (isUsed) {
                throw new Error('Role already exists');
            }
            return true;
        }).withMessage('Role already exists')
        .toUpperCase(),
    body('isSuperAdmin')
        .optional()
        .isBoolean()
        .withMessage('isSuperAdmin must be a boolean'),
    body('permissions')
        .optional()
        .isArray()
        .withMessage('Permissions must be an array')
        .custom((permissions, { req }) => {
            let p = [];
            permissions.map((value) => {
                if (p.includes(value)) {
                    throw new Error('Duplicate permissions');
                }
                p.push(value);
            })
            return true;
        }).withMessage('Duplicate permissions assigned'),
];

export const validateUpdateRole = [
    body('name')
        .isString()
        .notEmpty().withMessage('Name is required')
        .custom(async (name, { req }) => {
            const isUsed = await roleService.findByname(name.toUpperCase());
            if (isUsed && isUsed?._id.toString() !== req.params.roleId) {
                throw new Error('Role already exists');
            }
            return true;
        }).withMessage('Role already exists')
        .toUpperCase(),
    body('isSuperAdmin')
        .optional()
        .isBoolean()
        .withMessage('isSuperAdmin must be a boolean'),
    body('permissions')
        .optional()
        .isArray()
        .withMessage('Permissions must be an array')
        .custom((permissions) => {
            let p = [];
            permissions.map((value) => {
                if (p.includes(value)) {
                    throw new Error('Duplicate permissions');
                }
                p.push(value);
            })
            return true;
        }).withMessage('Duplicate permissions assigned'),
];


// ***********************FOR-DEPARTMENT-ROUTER************************** //
export const validateDepartmentCreation = [
    body('name')
        .toUpperCase()
        .notEmpty().withMessage('Department name is required')
        .custom(async (name) => {
            const isAlreadyExists = await isDepartmentNameExists(name);
            if (isAlreadyExists) {
                throw new Error('Department already exists')
            }
            return true;
        }).withMessage('Department already exists'),
];
export const validateDepartmentUpdate = [
    body('name')
        .toUpperCase()
        .notEmpty().withMessage('Department name is required')
        .custom(async (name, { req }) => {
            const isAlreadyExists = await departmentService.findByname(name);
            if (isAlreadyExists && isAlreadyExists?._id.toString() !== req.params.departmentId) {
                throw new Error('Department already exists')
            }
            return true;
        }).withMessage('Department already exists'),
];