import express from "express";
import { handleException } from "../common/common-helpers.js";
import employeeService from "../services/employee-service.js";
import studentService from "../services/student-service.js";
import authMiddleware from "../middlewares/auth-middlewares.js";
import { validateChangePassword, validateProfileUpdate } from "../middlewares/validation-middlewares.js";
import { validationResult } from "express-validator";
import { hashPassword } from "../common/utils.js";
const profileRouter = express.Router();
profileRouter.use(authMiddleware);


// For self profile fetch
profileRouter.get('/', async (req, res) => {
    try {
        const user = req.user;
        const id = user.id;
        if (user.isEmployee) { // if logged in user is employee then fetch his profile using employeeService else sfetch as student
            const employee = await employeeService.findEmployeeDetailsById(id);
            return res
                .status(200)
                .json({ message: 'Profile fetched', data: employee, errors: [] })
        }
        const student = await studentService.findStudentDataById(id);
        return res
            .status(200)
            .json({ message: 'Profile fetched', data: student, errors: [] })
    } catch (error) {
        return handleException(res, 'Could not fetch profile', error);
    }
})

// update profile
profileRouter.post('/update', validateProfileUpdate, async (req, res) => {
    try {
        const errors = validationResult(req);           // Check for validation errors
        if (!errors.isEmpty()) {
            return res.status(400).json({ data: null, errors: errors.array() });
        }
        const user = req.user;
        const id = user.id;
        let data = req.body;
        delete data.password;
        if (user.isEmployee) { // if logged in user is employee then update his profile using employeeService else update as student
            await employeeService.updateEmployee(id, data);
            return res
                .status(202)
                .json({ message: 'Profile Updated', data: null, errors: [] })
        }
        await studentService.updateStudent(id, data);
        return res
            .status(202)
            .json({ message: 'Profile updated', data: null, errors: [] })
    } catch (error) {
        return handleException(res, 'Failed to update profile', error);
    }
})

// Change Password
profileRouter.post('/change-password', validateChangePassword, async (req, res) => {
    try {
        const errors = validationResult(req);           // Check for validation errors
        if (!errors.isEmpty()) {
            return res.status(400).json({ data: null, errors: errors.array() });
        }
        const user = req.user;
        const id = user.id;
        if (user.isEmployee) { // if logged in user is employee then update his profile using employeeService else update as student
            await employeeService.updateEmployee(id, { password: await hashPassword(req.body.newPassword) });
            return res
                .status(202)
                .json({ message: 'Password Updated', data: null, errors: [] })
        }
        await studentService.updateStudent(id, { password: await hashPassword(req.body.newPassword) });
        return res
            .status(202)
            .json({ message: 'Password updated', data: null, errors: [] })
    } catch (error) {
        return handleException(res, 'Failed to update password', error);
    }
})
export default profileRouter;