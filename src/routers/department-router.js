import express from "express";
import { isDepartmentExists } from "../common/validators.js";
import departmentService from "../services/department-service.js";
import { handleException } from "../common/common-helpers.js";
import authMiddleware from "../middlewares/auth-middlewares.js";
import { body, validationResult } from "express-validator";
import roleMiddleware from "../middlewares/role-middleware.js";
import { UnprocessableEntityException } from "../exceptions.js";
import { Types } from "mongoose";

const departmentRouter = express.Router();
departmentRouter.use(authMiddleware);


const validateDepartmentCreation = [
    body('name')
        .notEmpty().withMessage('Department name is required')
        .custom(async (name) => {
            const isAlreadyExists = await isDepartmentExists(name);
            if (isAlreadyExists) {
                throw new Error('Department already exists')
            }
            return true;
        }).withMessage('Department already exists'),
];
departmentRouter.post('/create', roleMiddleware.bind(null, 'department.create'), validateDepartmentCreation, async (req, res) => {
    try {
        const errors = validationResult(req);           // Check for validation errors
        if (!errors.isEmpty()) {
            return res.status(400).json({ data: null, errors: errors.array() });
        }
        const newDepartment = await departmentService.createDepartment(req.body)
        res.status(201).json({ data: newDepartment, message: 'Department created successfully' });
    } catch (error) {
        handleException(res, 'Failed to create new department', error);
    }
});


departmentRouter.get('/get/:departmentId', async (req, res) => {
    try {
        let departmentId = req.params.departmentId;
        try {
            departmentId = new Types.ObjectId(departmentId);
        } catch (error) {
            throw new UnprocessableEntityException({ path: 'departmentId', msg: 'Invalid id' })
        }
        const department = await departmentService.findById(departmentId)
        if (department) {
            res.status(200).json({ data: department, message: 'Department fetched', errors: [] });
        }
        res.status(404).json({ data: null, message: 'Department not found', errors: 'Department not found' });
    } catch (error) {
        handleException(res, 'Failed to fetch department', error);
    }
})


departmentRouter.get('/getall', async (req, res) => {
    try {
        const departments = await departmentService.findAll();
        res.status(200).json({ data: departments, message: 'Departments fetched', errors: [] });
    } catch (error) {
        handleException(res, 'Failed to fetch departments', error);
    }
})


const validateDepartmentUpdate = [
    body('name')
        .optional()
        .notEmpty().withMessage('Department name is required')
];
departmentRouter.patch('/update/:departmentId', validateDepartmentUpdate, async (req, res) => {
    try {
        let departmentId = req.params.departmentId;
        try {
            departmentId = new Types.ObjectId(departmentId);
        } catch (error) {
            throw new UnprocessableEntityException({ path: 'departmentId', msg: 'Invalid id' })
        }
        const department = await departmentService.findByname(req.body.name)
        if (department && department._id.toString() !== departmentId.toString()) {
            throw new UnprocessableEntityException({ path: 'name', msg: 'Department already exists' })
        }
        const departments = await departmentService.updateDepartment(departmentId, req.body);
        if (!departments) {
            return res.status(404).json({ data: null, message: 'Department not found', errors: 'Department not found' });
        }
        res.status(202).json({ data: departments, message: 'Departments updated', errors: [] });
    } catch (error) {
        handleException(res, 'Failed to update department', error);
    }
})


departmentRouter.delete('/delete/:departmentId', async (req, res) => {
    try {
        let departmentId = req.params.departmentId;
        try {
            departmentId = new Types.ObjectId(departmentId);
        } catch (error) {
            throw new UnprocessableEntityException({ path: 'departmentId', msg: 'Invalid id' })
        }
        const department = await departmentService.deletedepartment(departmentId)
        if (department) {
            res.status(202).json({ data: department, message: 'Department deleted', errors: [] });
        }
        res.status(404).json({ data: null, message: 'Department not found', errors: 'Department not found' });
    } catch (error) {
        handleException(res, 'Failed to delete department', error);
    }
})

export default departmentRouter;    