import express from "express";
import authMiddleware from "../middlewares/auth-middlewares.js";
import { isClassNameExists } from "../common/validators.js";
import { body, validationResult } from "express-validator";
import roleMiddleware from "../middlewares/role-middleware.js";
import classService from "../services/class-service.js";
import { handleException } from "../common/common-helpers.js";
import { UnprocessableEntityException } from "../exceptions.js";
import { Types, isValidObjectId } from "mongoose";
import departmentService from "../services/department-service.js";

const classRouter = express.Router();
classRouter.use(authMiddleware);

const validateClassCreation = [
    body('department')
        .notEmpty().withMessage('Department is required')
        .isMongoId().withMessage('Must be a valid department'),
    body('name')
        .notEmpty().withMessage('Class name is required')
        .custom(async (name) => {
            const isAlreadyExists = await isClassNameExists(name);
            if (isAlreadyExists) {
                throw new Error('Class already exists')
            }
            return true;
        }).withMessage('Class already exists'),
];
classRouter.post('/create', roleMiddleware.bind(null, 'class.create'), validateClassCreation, async (req, res) => {
    try {
        const errors = validationResult(req);           // Check for validation errors
        if (!errors.isEmpty()) {
            return res.status(400).json({ data: null, errors: errors.array() });
        }
        const newClass = await classService.create(req.body);
        return res.status(201).json({ data: newClass, message: 'Class created successfully' });
    } catch (error) {
        return handleException(res, 'Failed to create new class', error);
    }
});


classRouter.get('/get/:classId', async (req, res) => {
    try {
        let classId = req.params.classId;
        try {
            classId = new Types.ObjectId(classId);
        } catch (error) {
            throw new UnprocessableEntityException({ path: 'classId', msg: 'Invalid id' })
        }
        const result = await classService.findById(classId)
        if (result) {
            return res.status(200).json({ data: result, message: 'Class fetched', errors: [] });
        }
        return res.status(404).json({ data: null, message: 'Class not found', errors: 'Class not found' });
    } catch (error) {
        return handleException(res, 'Failed to fetch class', error);
    }
})


classRouter.get('/getall', async (req, res) => {
    try {
        const classes = await classService.findAll();
        return res.status(200).json({ data: classes, message: 'Classes fetched', errors: [] });
    } catch (error) {
        return handleException(res, 'Failed to fetch classes', error);
    }
})


classRouter.get('/get-by-department/:departmentId', async (req, res) => {
    try {
        let departmentId = req.params.departmentId;
        const isValidId = isValidObjectId(departmentId)
        if (!isValidId) {
            throw new UnprocessableEntityException({ path: 'departmentId', msg: 'Invalid id' })
        }
        const classes = await classService.findByDepartmentId(req.params.departmentId)
        return res.status(200).json({ data: classes, message: 'Classes fetched', errors: [] })
    } catch (error) {
        return handleException(res, 'Failed to fetch classes', error)
    }
})


const validateClassUpdate = [
    body('name')
        .notEmpty().withMessage('Class name is required'),
    body('department')
        .optional()
        .notEmpty().withMessage('Department is required')
        .isMongoId().withMessage('Department must be valid')
];
classRouter.patch('/update/:classId', validateClassUpdate, async (req, res) => {
    try {
        const errors = validationResult(req);           // Check for validation errors
        if (!errors.isEmpty()) {
            return res.status(400).json({ data: null, errors: errors.array() });
        }
        let classId = req.params.classId;
        const isValidId = isValidObjectId(classId)
        if (!isValidId) {
            throw new UnprocessableEntityException({ path: 'classId', msg: 'Invalid id' })
        }
        const result = await classService.findByName(req.body.name)
        if (result && result._id.toString() !== classId.toString()) {
            throw new UnprocessableEntityException({ path: 'name', msg: 'Class already exists' })
        }
        const updatedClass = await classService.updateClass(classId.toString(), req.body);
        if (!updatedClass) {
            return res.status(404).json({ data: null, message: 'Class not found', errors: 'Class not found' });
        }
        res.status(202).json({ data: updatedClass, message: 'Class updated', errors: [] });
    } catch (error) {
        handleException(res, 'Failed to update Class', error);
    }
})


classRouter.delete('/delete/:classId', async (req, res) => {
    try {
        let classId = req.params.classId;
        const isValidId = isValidObjectId(classId)
        if (!isValidId) {
            throw new UnprocessableEntityException({ path: 'classId', msg: 'Invalid id' })
        }        
        const result = await classService.deleteClass(classId);
        if (result) {
            res.status(202).json({ data: result, message: 'Class deleted', errors: [] });
        }
        res.status(404).json({ data: null, message: 'Class not found', errors: 'Class not found' });
    } catch (error) {
        handleException(res, 'Failed to delete Class', error);
    }
})


export default classRouter;