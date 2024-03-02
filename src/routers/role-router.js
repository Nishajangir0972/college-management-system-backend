import express from 'express';
import { body, validationResult } from 'express-validator';
import roleModel from '../models/role-model.js';
import { handleException } from '../common/common-helpers.js';

const roleRouter = express.Router();

const validateCreateRole = [
    body('name').notEmpty().withMessage('Name is required').isString(),
    body('isSuperAdmin').optional().isBoolean().withMessage('isSuperAdmin must be a boolean'),
    body('permissions').optional().isArray().withMessage('Permissions must be an array'),
];

const validateUpdateRole = [
    body('name').optional().isString(),
    body('isSuperAdmin').optional().isBoolean().withMessage('isSuperAdmin must be a boolean'),
    body('permissions').optional().isArray().withMessage('Permissions must be an array'),
];

// Create a new role
roleRouter.post('/create', validateCreateRole, async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const newRole = await roleModel.create(req.body);
        res.status(201).json(newRole);
    } catch (error) {
        handleException(res, 'Failed to create role', error);
    }
});

// Update role by ID
roleRouter.patch('/update/:id', validateUpdateRole, async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const updatedRole = await roleModel.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!updatedRole) {
            return res.status(404).json({ errors: 'Role not found' });
        }
        res.status(200).json(updatedRole);
    } catch (error) {
        handleException(res, 'Failed to update role', error);
    }
});

// Get all roles
roleRouter.get('/', async (req, res) => {
    try {
        const roles = await roleModel.find();
        res.status(200).json(roles);
    } catch (error) {
        handleException(res, 'Failed to fetch roles', error);
    }
});

// Get role by ID
roleRouter.get('/:id', async (req, res) => {
    try {
        const role = await roleModel.findById(req.params.id);
        if (!role) {
            return res.status(404).json({ errors: 'Role not found' });
        }
        res.status(200).json(role);
    } catch (error) {
        handleException(res, 'Failed to fetch role', error);
    }
});

// Delete role by ID
roleRouter.delete('/delete/:id', async (req, res) => {
    try {
        const deletedRole = await roleModel.findByIdAndDelete(req.params.id);
        if (!deletedRole) {
            return res.status(404).json({ errors: 'Role not found' });
        }
        res.status(204).send();
    } catch (error) {
        handleException(res, 'Failed to delete role', error);
    }
});

export default roleRouter;
