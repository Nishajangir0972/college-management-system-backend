import { body } from "express-validator";
import { isCourseNameExists, isDepartmentIdExists } from "../common/validators.js";

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