import express from "express";
import departmentService from "../services/department-service.js";
import { handleException } from "../common/common-helpers.js";
import authMiddleware from "../middlewares/auth-middlewares.js";
import { body, validationResult } from "express-validator";
import roleMiddleware from "../middlewares/role-middleware.js";
import { UnprocessableEntityException } from "../exceptions.js";
import { Types, isValidObjectId } from "mongoose";
import { validateDepartmentCreation, validateDepartmentUpdate } from "../middlewares/validation-middlewares.js";

const departmentRouter = express.Router();
departmentRouter.use(authMiddleware);

departmentRouter.post('/create', roleMiddleware.bind(null, 'department.create'), validateDepartmentCreation, async (req, res) => {
    try {
        const errors = validationResult(req);           // Check for validation errors
        if (!errors.isEmpty()) {
            return res.status(400).json({ data: null, errors: errors.array() });
        }
        const newDepartment = await departmentService.createDepartment(req.body)
        return res.status(201).json({ data: newDepartment, message: 'Department created successfully', errors: [] });
    } catch (error) {
        return handleException(res, 'Failed to create new department', error);
    }
});

departmentRouter.get('/get/:departmentId', async (req, res) => {
    try {
        let departmentId = req.params.departmentId;
        const isValidId = isValidObjectId(departmentId);
        if (!isValidId) {
            throw new UnprocessableEntityException({ path: 'departmentId', msg: 'Invalid id' })
        }
        const department = await departmentService.findById(departmentId)
        if (department) {
            return res.status(200).json({ data: department, message: 'Department fetched', errors: [] });
        }
        return res.status(404).json({ data: null, message: 'Department not found', errors: 'Department not found' });
    } catch (error) {
        return handleException(res, 'Failed to fetch department', error);
    }
})

departmentRouter.get('/getall', async (req, res) => {
    try {
        const departments = await departmentService.findAll();
        return res.status(200).json({ data: departments, message: 'Departments fetched', errors: [] });
    } catch (error) {
        return handleException(res, 'Failed to fetch departments', error);
    }
})

departmentRouter.patch('/update/:departmentId', validateDepartmentUpdate, async (req, res) => {
    try {
        let departmentId = req.params.departmentId;
        const isValidId = isValidObjectId(departmentId);
        if (!isValidId) {
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
        return res.status(202).json({ data: departments, message: 'Departments updated', errors: [] });
    } catch (error) {
        return handleException(res, 'Failed to update department', error);
    }
})


departmentRouter.delete('/delete/:departmentId', async (req, res) => {
    try {
        let departmentId = req.params.departmentId;
        const isValidId = isValidObjectId(departmentId);
        if (!isValidId) {
            throw new UnprocessableEntityException({ path: 'departmentId', msg: 'Invalid id' })
        }
        const department = await departmentService.deletedepartment(departmentId)
        if (department) {
            return res.status(202).json({ data: department, message: 'Department deleted', errors: [] });
        }
        return res.status(404).json({ data: null, message: 'Department not found', errors: 'Department not found' });
    } catch (error) {
        return handleException(res, 'Failed to delete department', error);
    }
})

export default departmentRouter;    