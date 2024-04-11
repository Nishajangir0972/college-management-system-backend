import express from "express";
import authMiddleware from "../middlewares/auth-middlewares.js";
import { body, validationResult } from "express-validator";
import roleMiddleware from "../middlewares/role-middleware.js";
import { getPaginationQuery, handleException } from "../common/common-helpers.js";
import { UnprocessableEntityException } from "../exceptions.js";
import { isValidObjectId } from "mongoose";
import { validateAddNewExam, validateExamUpdate } from "../middlewares/validation-middlewares.js";
import examsService from "../services/exams-service.js";

const examRouter = express.Router();
examRouter.use(authMiddleware);

examRouter.post('/add-new', roleMiddleware.bind(null, 'exam.exam.create'), validateAddNewExam, async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ data: null, errors: errors.array() });
        }
        const newExam = await examsService.create(req.body);
        return res.status(201).json({ data: newExam, message: 'New exam added successfully' });
    } catch (error) {
        return handleException(res, 'Failed to add new exam', error);
    }
});

examRouter.get('/get/:examId', async (req, res) => {
    try {
        let examId = req.params.examId;
        const isValidId = isValidObjectId(examId);
        if (!isValidId) {
            throw new UnprocessableEntityException({ path: 'examId', msg: 'Invalid id' })
        }
        const result = await examsService.findById(examId)
        if (result) {
            return res.status(200).json({ data: result, message: 'exam fetched', errors: [] });
        }
        return res.status(404).json({ data: null, message: 'exam not found', errors: 'exam not found' });
    } catch (error) {
        return handleException(res, 'Failed to fetch exam', error);
    }
})

examRouter.get('/getall', async (req, res) => {
    try {
        const { page, limit, sort } = getPaginationQuery(req.query)
        const exams = await examsService.findAllExamsPaginated(page, limit, sort);
        return res.status(200).json({ data: exams, message: 'Exams fetched', errors: [] });
    } catch (error) {
        return handleException(res, 'Failed to fetch exams', error);
    }
})

examRouter.get('/getall/:session', async (req, res) => {
    try {
        const { page, limit, sort } = getPaginationQuery(req.query)
        const exams = await examsService.findAllExamsWithSessionPaginated(page, limit, sort, req.params.session);
        return res.status(200).json({ data: exams, message: 'Exams fetched', errors: [] });
    } catch (error) {
        return handleException(res, 'Failed to fetch exams', error);
    }
})

examRouter.patch('/update/:examId', validateExamUpdate, async (req, res) => {
    try {
        const errors = validationResult(req);           // Check for validation errors
        if (!errors.isEmpty()) {
            return res.status(400).json({ data: null, errors: errors.array() });
        }
        let examId = req.params.examId;
        const isValidId = isValidObjectId(examId)
        if (!isValidId) {
            throw new UnprocessableEntityException({ path: 'examId', msg: 'Invalid id' })
        }
        const data = req.body;
        const updatedExam = await examsService.updateExam(examId, data)
        if (!updatedExam) {
            return res.status(404).json({ data: null, message: 'Exam not found', errors: 'Exam not found' });
        }
        return res.status(202).json({ data: updatedExam, message: 'Exam updated', errors: [] });
    } catch (error) {
        console.log(error);
        return handleException(res, 'Failed to update exam', error);
    }
})


examRouter.delete('/delete/:examId', async (req, res) => {
    try {
        let examId = req.params.examId;
        const isValidId = isValidObjectId(examId)
        if (!isValidId) {
            throw new UnprocessableEntityException({ path: 'examId', msg: 'Invalid id' })
        }
        const result = await examsService.deleteExam(examId);
        if (result) {
            return res.status(202).json({ data: null, message: 'Exam deleted', errors: [] });
        }
        return res.status(404).json({ data: null, message: 'Exam not found', errors: 'Exam not found' });
    } catch (error) {
        return handleException(res, 'Failed to delete exam', error);
    }
})


export default examRouter;