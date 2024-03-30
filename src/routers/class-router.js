import express from "express";
import authMiddleware from "../middlewares/auth-middlewares.js";
import { isClassNameExists } from "../common/validators.js";
import { body, validationResult } from "express-validator";
import roleMiddleware from "../middlewares/role-middleware.js";
import classService from "../services/class-service.js";
import { handleException } from "../common/common-helpers.js";
import { UnprocessableEntityException } from "../exceptions.js";
import { Types, isValidObjectId } from "mongoose";
import { validateClassCreation, validateClassUpdate } from "../middlewares/validation-middlewares.js";

const classRouter = express.Router();
classRouter.use(authMiddleware);

classRouter.post('/create', roleMiddleware.bind(null, 'class.class.create'), validateClassCreation, async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ data: null, errors: errors.array() });
        }
        const newClass = await classService.create(req.body);
        return res.status(201).json({ data: newClass, message: 'Class created successfully' });
    } catch (error) {
        return handleException(res, 'Failed to create new class', error);
    }
});

classRouter.get('/get/:classId', roleMiddleware.bind(null, 'class.class.read'), async (req, res) => {
    try {
        let classId = req.params.classId;
        const isValidId = isValidObjectId(classId)
        if (!isValidId) {
            throw new UnprocessableEntityException({ path: 'classId', msg: 'Invalid id' })
        }
        const result = await classService.findClassDataById(classId)
        if (result) {
            return res.status(200).json({ data: result, message: 'Class fetched', errors: [] });
        }
        return res.status(404).json({ data: null, message: 'Class not found', errors: 'Class not found' });
    } catch (error) {
        return handleException(res, 'Failed to fetch class', error);
    }
})

classRouter.get('/getall', roleMiddleware.bind(null, 'class.class.read'), async (req, res) => {
    try {
        const classes = await classService.findAllClassesData();
        return res.status(200).json({ data: classes, message: 'Classes fetched', errors: [] });
    } catch (error) {
        return handleException(res, 'Failed to fetch classes', error);
    }
})

classRouter.get('/get-by-department/:departmentId', roleMiddleware.bind(null, 'class.class.read'), async (req, res) => {
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

classRouter.patch('/update/:classId', roleMiddleware.bind(null, 'class.class.updates'), validateClassUpdate, async (req, res) => {
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
        const updatedClass = await classService.updateClass(classId.toString(), req.body);
        if (!updatedClass) {
            return res.status(404).json({ data: null, message: 'Class not found', errors: 'Class not found' });
        }
        return res.status(202).json({ data: updatedClass, message: 'Class updated', errors: [] });
    } catch (error) {
        return handleException(res, 'Failed to update Class', error);
    }
})

classRouter.delete('/delete/:classId', roleMiddleware.bind(null, 'class.class.delete'), async (req, res) => {
    try {
        let classId = req.params.classId;
        const isValidId = isValidObjectId(classId)
        if (!isValidId) {
            throw new UnprocessableEntityException({ path: 'classId', msg: 'Invalid id' })
        }
        const result = await classService.deleteClass(classId);
        if (result) {
            return res.status(202).json({ data: null, message: 'Class deleted', errors: [] });
        }
        return res.status(404).json({ data: null, message: 'Class not found', errors: 'Class not found' });
    } catch (error) {
        return handleException(res, 'Failed to delete Class', error);
    }
})


export default classRouter;