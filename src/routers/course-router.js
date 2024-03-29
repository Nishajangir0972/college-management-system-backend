import express from "express";
import authMiddleware from "../middlewares/auth-middlewares.js";
import { body, validationResult } from "express-validator";
import roleMiddleware from "../middlewares/role-middleware.js";
import { handleException } from "../common/common-helpers.js";
import { UnprocessableEntityException } from "../exceptions.js";
import { Types, isValidObjectId } from "mongoose";
import { validatecourseCreation } from "../middlewares/validation-middlewares.js";
import courseService from "../services/course-service.js";

const courseRouter = express.Router();
courseRouter.use(authMiddleware);

courseRouter.post('/create', roleMiddleware.bind(null, 'course.create'), validatecourseCreation, async (req, res) => {
    try {
        const errors = validationResult(req);           // Check for validation errors
        if (!errors.isEmpty()) {
            return res.status(400).json({ data: null, errors: errors.array() });
        }
        const newcourse = await courseService.create(req.body);
        return res.status(201).json({ data: newcourse, message: 'Course created successfully' });
    } catch (error) {
        return handleException(res, 'Failed to create course', error);
    }
});


courseRouter.get('/get/:courseId', async (req, res) => {
    try {
        let courseId = req.params.courseId;
        const isValidId = isValidObjectId(courseId);
        if (!isValidId) {
            throw new UnprocessableEntityException({ path: 'courseId', msg: 'Invalid id' })
        }
        const result = await courseService.findById(courseId)
        if (result) {
            return res.status(200).json({ data: result, message: 'course fetched', errors: [] });
        }
        return res.status(404).json({ data: null, message: 'course not found', errors: 'course not found' });
    } catch (error) {
        return handleException(res, 'Failed to fetch course', error);
    }
})


courseRouter.get('/getall', async (req, res) => {
    try {
        const courses = await courseService.findAll();
        return res.status(200).json({ data: courses, message: 'coursees fetched', errors: [] });
    } catch (error) {
        return handleException(res, 'Failed to fetch coursees', error);
    }
})


courseRouter.get('/get-by-department/:departmentId', async (req, res) => {
    try {
        let departmentId = req.params.departmentId;
        const isValidId = isValidObjectId(departmentId)
        if (!isValidId) {
            throw new UnprocessableEntityException({ path: 'departmentId', msg: 'Invalid id' })
        }
        const courses = await courseService.findByDepartmentId(req.params.departmentId)
        return res.status(200).json({ data: courses, message: 'courses fetched', errors: [] })
    } catch (error) {
        return handleException(res, 'Failed to fetch coursees', error)
    }
})


const validatecourseUpdate = [
    body('name')
        .notEmpty().withMessage('course name is required'),
    body('department')
        .optional()
        .notEmpty().withMessage('Department is required')
        .isMongoId().withMessage('Department must be valid')
];
courseRouter.patch('/update/:courseId', validatecourseUpdate, async (req, res) => {
    try {
        const errors = validationResult(req);           // Check for validation errors
        if (!errors.isEmpty()) {
            return res.status(400).json({ data: null, errors: errors.array() });
        }
        let courseId = req.params.courseId;
        const isValidId = isValidObjectId(courseId)
        if (!isValidId) {
            throw new UnprocessableEntityException({ path: 'courseId', msg: 'Invalid id' })
        }
        const result = await courseService.findByName(req.body.name)
        if (result && result._id.toString() !== courseId.toString()) {
            throw new UnprocessableEntityException({ path: 'name', msg: 'course already exists' })
        }
        const updatedcourse = await courseService.updatecourse(courseId.toString(), req.body);
        if (!updatedcourse) {
            return res.status(404).json({ data: null, message: 'course not found', errors: 'course not found' });
        }
        res.status(202).json({ data: updatedcourse, message: 'course updated', errors: [] });
    } catch (error) {
        handleException(res, 'Failed to update course', error);
    }
})


courseRouter.delete('/delete/:courseId', async (req, res) => {
    try {
        let courseId = req.params.courseId;
        const isValidId = isValidObjectId(courseId)
        if (!isValidId) {
            throw new UnprocessableEntityException({ path: 'courseId', msg: 'Invalid id' })
        }        
        const result = await courseService.deletecourse(courseId);
        if (result) {
            res.status(202).json({ data: result, message: 'course deleted', errors: [] });
        }
        res.status(404).json({ data: null, message: 'course not found', errors: 'course not found' });
    } catch (error) {
        handleException(res, 'Failed to delete course', error);
    }
})


export default courseRouter;