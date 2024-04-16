import express from "express";
import authMiddleware from "../middlewares/auth-middlewares.js";
import { validationResult } from "express-validator";
import roleMiddleware from "../middlewares/role-middleware.js";
import { getPaginationQuery, handleException } from "../common/common-helpers.js";
import { UnprocessableEntityException } from "../exceptions.js";
import { isValidObjectId } from "mongoose";
import subjectService from "../services/subject-service.js";
import { validateAddNewSubject, validateSubjectUpdate } from "../middlewares/validation-middlewares.js";

const subjectRouter = express.Router();
subjectRouter.use(authMiddleware);

subjectRouter.post('/add-new', roleMiddleware.bind(null, 'subject.subject.create'), validateAddNewSubject, async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ data: null, errors: errors.array() });
        }
        const newSubject = await subjectService.create(req.body);
        return res.status(201).json({ data: newSubject, message: 'New subject added successfully' });
    } catch (error) {
        return handleException(res, 'Failed to add new subject', error);
    }
});

subjectRouter.get('/get/:subjectId', async (req, res) => {
    try {
        let subjectId = req.params.subjectId;
        const isValidId = isValidObjectId(subjectId);
        if (!isValidId) {
            throw new UnprocessableEntityException({ path: 'subjectId', msg: 'Invalid id' })
        }
        const result = await subjectService.findById(subjectId)
        if (result) {
            return res.status(200).json({ data: result, message: 'subject fetched', errors: [] });
        }
        return res.status(404).json({ data: null, message: 'subject not found', errors: 'subject not found' });
    } catch (error) {
        return handleException(res, 'Failed to fetch subject', error);
    }
})

subjectRouter.get('/getall', async (req, res) => {
    try {
        const { page, limit, sort } = getPaginationQuery(req.query)
        const subjects = await subjectService.findAllSubjectssPaginated(page, limit, sort);
        return res.status(200).json({ data: subjects, message: 'Subjects fetched', errors: [] });
    } catch (error) {
        return handleException(res, 'Failed to fetch subjects', error);
    }
})

subjectRouter.get('/getall/:classId', async (req, res) => {
    try {
        let classId = req.params.classId;
        const isValidId = isValidObjectId(classId);
        if (!isValidId) {
            throw new UnprocessableEntityException({ path: 'classId', msg: 'Invalid id' })
        }
        const result = await subjectService.findAllSubjectsOfClass(classId);
        return res.status(200).json({ data: result, message: 'subjects fetched', errors: [] });
    } catch (error) {
        return handleException(res, 'Failed to fetch subjects', error);
    }
})

subjectRouter.patch('/update/:subjectId', validateSubjectUpdate, async (req, res) => {
    try {
        const errors = validationResult(req);           // Check for validation errors
        if (!errors.isEmpty()) {
            return res.status(400).json({ data: null, errors: errors.array() });
        }
        let subjectId = req.params.subjectId;
        const isValidId = isValidObjectId(subjectId)
        if (!isValidId) {
            throw new UnprocessableEntityException({ path: 'subjectId', msg: 'Invalid id' })
        }
        const data = req.body;
        const updatedSubject = await subjectService.updateSubject(subjectId, data)
        if (!updatedSubject) {
            return res.status(404).json({ data: null, message: 'Subject not found', errors: 'Subject not found' });
        }
        return res.status(202).json({ data: updatedSubject, message: 'Subject updated', errors: [] });
    } catch (error) {
        return handleException(res, 'Failed to update subject', error);
    }
})

subjectRouter.delete('/delete/:subjectId', async (req, res) => {
    try {
        let subjectId = req.params.subjectId;
        const isValidId = isValidObjectId(subjectId)
        if (!isValidId) {
            throw new UnprocessableEntityException({ path: 'subjectId', msg: 'Invalid id' })
        }
        const result = await subjectService.deleteSubject(subjectId);
        if (result) {
            return res.status(202).json({ data: null, message: 'Subject deleted', errors: [] });
        }
        return res.status(404).json({ data: null, message: 'Subject not found', errors: 'Subject not found' });
    } catch (error) {
        return handleException(res, 'Failed to delete Subject', error);
    }
})


export default subjectRouter;