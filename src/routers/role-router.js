import express from 'express';
import { validationResult } from 'express-validator';
import roleModel from '../models/role-model.js';
import { handleException } from '../common/common-helpers.js';
import { NotFoundException, UnprocessableEntityException } from '../exceptions.js';
import { Types, isValidObjectId } from 'mongoose';
import roleService from '../services/role-service.js';
import authMiddleware from '../middlewares/auth-middlewares.js';
import { validateCreateRole, validateUpdateRole } from '../middlewares/validation-middlewares.js';

const roleRouter = express.Router();
roleRouter.use(authMiddleware)

// Create a new role
roleRouter.post('/create', validateCreateRole, async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ data: null, errors: errors.array() });
        }
        const newRole = await roleModel.create(req.body);
        return res.status(201).json({ data: newRole, message: 'Created role succesfully', errors: [] });
    } catch (error) {
        return handleException(res, 'Failed to create role', error);
    }
});

// Update role by ID
roleRouter.patch('/update/:roleId', validateUpdateRole, async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        let roleId = req.params.roleId;
        const isValidId = isValidObjectId(roleId);
        if (!isValidId) {
            throw new UnprocessableEntityException({ path: 'roleId', msg: 'Invalid id' })
        }
        const updatedRole = await roleService.updateRole(roleId, req.body);
        if (!updatedRole) {
            return res.status(404).json({ data: null, message: 'Role not found', errors: 'Role not found' });
        }
        return res.status(202).json({ data: updatedRole, message: 'Role updated succesfully', errors: [] });
    } catch (error) {
        return handleException(res, 'Failed to update role', error);
    }
});

// Get all roles
roleRouter.get('/', async (req, res) => {
    try {
        const roles = await roleModel.find();
        return res.status(200).json({ data: roles, message: 'Fetched all roles succesfully', errors: [] });
    } catch (error) {
        return handleException(res, 'Failed to fetch roles', error);
    }
});

// Get role by ID
roleRouter.get('/:roleId', async (req, res) => {
    try {
        let roleId = req.params.roleId
        try {
            roleId = new Types.ObjectId(roleId);
        } catch (error) {
            throw new UnprocessableEntityException({ path: 'roleId', msg: 'Invalid id' })
        }
        const role = await roleModel.findById(req.params.roleId);
        if (!role) {
            throw new NotFoundException('Role not found')
        }
        return res.status(200).json({ data: role, message: 'Fetched role succesfully', errors: [] });
    } catch (error) {
        return handleException(res, 'Failed to fetch role', error);
    }
});

// Get permissions for logged-in user
roleRouter.get('/get-permissions/self', async (req, res) => {
    try {
        const roleId = req.user.role;
        console.log();
        const role = await roleModel.findById(roleId);
        if (!role) {
            throw new NotFoundException('Role not found')
        }
        return res.status(200).json({ data: role.permissions, message: 'Fetched permissions succesfully', errors: [] });
    } catch (error) {
        return handleException(res, 'Failed to fetch role', error);
    }
})

// Delete role by ID
roleRouter.delete('/delete/:roleId', async (req, res) => {
    try {
        let roleId = req.params.roleId
        try {
            roleId = new Types.ObjectId(roleId);
        } catch (error) {
            throw new UnprocessableEntityException({ path: 'roleId', msg: 'Invalid id' })
        }
        const deletedRole = await roleModel.findByIdAndDelete(req.params.roleId);
        if (!deletedRole) {
            throw new NotFoundException('Role not found')
        }
        return res.status(202).json({ data: null, message: 'Role deleted succesfully', errors: [] });
    } catch (error) {
        return handleException(res, 'Failed to delete role', error);
    }
});

export default roleRouter;
