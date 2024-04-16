import { body } from "express-validator";
import { isClassIdExists, isClassNameExists, isCourseNameExists, isDepartmentIdExists, isDepartmentNameExists, isEmailUsed, isEmployeeEmailUsed, isRoleIdExists, isRoleNameExists } from "../common/validators.js";
import studentService from "../services/student-service.js";
import classModel from "../models/class-model.js";
import roleService from "../services/role-service.js";
import departmentService from "../services/department-service.js";
import employeeService from "../services/employee-service.js";
import { comparePasswords } from "../common/utils.js";
import examsService from "../services/exams-service.js";
import classService from "../services/class-service.js";
import subjectService from "../services/subject-service.js";

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


// ***********************FOR-EMPLOYEE-ROUTER************************** //
export const validateEmployeeCreation = [
    body('firstName')
        .notEmpty().withMessage('First name is required'),
    body('mobile')
        .notEmpty().withMessage('Mobile Number is required')
        .isNumeric().withMessage('Mobile must be a number'),
    body('email')
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Invalid email format')
        .custom(async (email) => {
            const isUsed = await isEmployeeEmailUsed(email);
            if (isUsed) {
                throw new Error('Email is already taken');
            }
            return true;
        }).withMessage('Email is already taken'),
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
    body('role')
        .notEmpty().withMessage('Role is required')
        .isMongoId().withMessage('Must be a valid role')
        .custom(async (value) => {
            const roleExists = await isRoleIdExists(value);
            if (!roleExists) {
                throw new Error('Role doesnt exists');
            }
            return true;
        }).withMessage(`Role doesn't exists`),
];

export const validateEmployeeUpdate = [
    body('firstName')
        .optional()
        .notEmpty()
        .withMessage('First name is required'),
    body('mobile')
        .optional()
        .isNumeric().withMessage('Mobile must be a number')
        .notEmpty().withMessage('Mobile Number is required'),
    body('email')
        .optional()
        .isEmail().withMessage('Invalid email format')
        .notEmpty().withMessage('Email is required')
        .custom(async (email, { req }) => {
            const isUsed = await employeeService.findByEmail(email);
            if (isUsed && isUsed?._id.toString() !== req.params.employeeId) {
                throw new Error('Email is already taken');
            }
            return true;
        }).withMessage('Email is already taken'),
    body('department')
        .optional()
        .isMongoId().withMessage('Must be a valid department')
        .notEmpty().withMessage('Department is required')
        .custom(async (value) => {
            const departmentExists = await isDepartmentIdExists(value);
            if (!departmentExists) {
                throw new Error('Department doesnt exists');
            }
            return true;
        }).withMessage(`Department doesn't exists`),
    body('role')
        .optional()
        .isMongoId().withMessage('Must be a valid role')
        .notEmpty().withMessage('Role is required')
        .custom(async (value) => {
            const roleExists = await isRoleIdExists(value);
            if (!roleExists) {
                throw new Error('Role doesnt exists');
            }
            return true;
        }).withMessage(`Role doesn't exists`),
];


// ***********************FOR-PROFILE-ROUTER************************** //
export const validateProfileUpdate = [
    body('mobile')
        .optional()
        .isNumeric().withMessage('Mobile must be a number')
        .notEmpty().withMessage('Mobile Number is required'),
    body('alternativeMobile')
        .optional()
        .isNumeric().withMessage('Mobile must be a number'),
    body('username')
        .optional()
        .custom(async (username, { req }) => {
            if (req.user.isEmployee) {
                const isUsed = await employeeService.findByUsername(username);
                if (isUsed && isUsed?._id?.toString() !== req.user.id.toString()) {
                    throw new Error('Username is already taken');
                }
            }
            else {
                const isUsed = await studentService.findByUsername(username);
                if (isUsed && isUsed?._id?.toString() !== req.user.id.toString()) {
                    throw new Error('Username is already taken');
                }
            }
            return true;
        }).withMessage('Username is already taken')
        .notEmpty().withMessage('Username cant be empty'),
    body('email')
        .optional()
        .isEmail().withMessage('Invalid email format')
        .custom(async (email, { req }) => {
            if (req.user.isEmployee) {
                const isUsed = await employeeService.findByEmail(email);
                if (isUsed && isUsed?._id?.toString() !== req.user.id.toString()) {
                    throw new Error('Email is already taken');
                }
            }
            else {
                const isUsed = await studentService.findByEmail(email);
                if (isUsed && isUsed?._id?.toString() !== req.user.id.toString()) {
                    throw new Error('Email is already taken');
                }
            }
            return true;
        }).withMessage('Email is already taken')
        .notEmpty().withMessage('Email is required'),
    body('bio')
        .optional(),
];

export const validateChangePassword = [
    body('password')
        .custom(async (password, { req }) => {
            if (req.user.isEmployee) {
                const employee = await employeeService.findById(req.user.id);
                const isCorrectPassword = await comparePasswords(password, employee.password);
                if (!isCorrectPassword) {
                    throw new Error('Incorrect Password');
                }
            }
            else {
                const student = await studentService.findById(req.user.id);
                const isCorrectPassword = await comparePasswords(password, student.password);
                if (!isCorrectPassword) {
                    throw new Error('Incorrect Password');
                }
            }
            return true;
        }).withMessage('Incorrect Password')
        .notEmpty().withMessage('Password cannot be empty'),
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
]


// ***********************FOR-EXAMS-ROUTER************************** //
export const validateAddNewExam = [
    body('name')
        .custom(async (name, { req }) => {
            const isExamExists = await examsService.findOneByNameAndSession(name, req.body.session);
            if (isExamExists) {
                throw new Error('Exam already exists in this session')
            }
            return true;
        }).withMessage('Exam already exists in this session')
        .notEmpty().withMessage('Name is required'),
    body('session')
        .custom(async (session) => {
            const sessionPattern = /^\d{4}-\d{4}$/;
            // Check if session string matches the pattern
            if (!sessionPattern.test(session)) {
                throw new Error('Invalid session format');
            }
            const [startYear, endYear] = session.split('-').map(Number);
            if (startYear > endYear || endYear - startYear > 1) {
                throw new Error('Invalid session range');
            }
            return true;
        })
        .withMessage('Valid session example 2020-2021')
        .notEmpty().withMessage('Session could not be empty')
];

export const validateExamUpdate = [
    body('name')
        .optional()
        .custom(async (name, { req }) => {
            const exam = await examsService.findById(req.params.examId);
            const isExamExists = await examsService.findOneByNameAndSession(name, req.body.session ? req.body.session : exam.session);
            if (isExamExists && isExamExists._id.toString() !== req.params.examId) {
                throw new Error('Exam already exists in this session')
            }
            return true;
        }).withMessage('Exam already exists in this session')
        .notEmpty().withMessage('Name is required'),
    body('session')
        .optional()
        .custom(async (session) => {
            const sessionPattern = /^\d{4}-\d{4}$/;
            // Check if session string matches the pattern
            if (!sessionPattern.test(session)) {
                throw new Error('Invalid session format');
            }
            const [startYear, endYear] = session.split('-').map(Number);
            if (startYear > endYear || endYear - startYear > 1) {
                throw new Error('Invalid session range');
            }
            return true;
        })
        .withMessage('Valid session example 2020-2021')
        .notEmpty().withMessage('Session could not be empty')
];



// ***********************FOR-Subjects-ROUTER************************** //
export const validateAddNewSubject = [
    body('name')
        .custom(async (name, { req }) => {
            const isSubjectExists = await subjectService.findOneByNameAndClass(name, req.body.class);
            if (isSubjectExists) {
                throw new Error('Subject already exists in this class')
            }
            return true;
        }).withMessage('Subject already exists in this class')
        .notEmpty().withMessage('Name is required'),
    body('description')
        .optional()
        .notEmpty().withMessage('Name is required'),
    body('class')
        .isMongoId().withMessage('Class must be valid')
        .custom(async (data) => {
            const isValidClass = await classService.findById(data)
            if (!isValidClass) {
                throw new Error('Class does not exists')
            }
            return true;
        })
        .withMessage('Class does not exists')
        .notEmpty().withMessage('Class could not be empty')
];

export const validateSubjectUpdate = [
    body('name')
        .optional()
        .custom(async (name, { req }) => {
            const subject = await subjectService.findById(req.params.subjectId)
            const isSubjectExists = await subjectService.findOneByNameAndClass(name, req.body.class ? req.body.class : subject.class);
            if (isSubjectExists) {
                throw new Error('Subject already exists in this class')
            }
            return true;
        }).withMessage('Subject already exists in this class')
        .notEmpty().withMessage('Name is required'),
    body('description')
        .optional()
        .notEmpty().withMessage('Name is required'),
    body('class')
        .optional()
        .isMongoId().withMessage('Class must be valid')
        .custom(async (data) => {
            const isValidClass = await classService.findById(data)
            if (!isValidClass) {
                throw new Error('Class does not exists')
            }
            return true;
        })
        .withMessage('Class does not exists')
        .notEmpty().withMessage('Class could not be empty')
];