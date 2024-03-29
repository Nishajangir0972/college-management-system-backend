import express from "express";
import studentRouter from "./student-router.js";
import employeeRouter from "./employee-router.js";
import authRouter from "./auth-router.js";
import roleRouter from "./role-router.js";
import departmentRouter from "./department-router.js";
import classRouter from "./class-router.js";
import courseRouter from "./course-router.js";

const mainRouter = express.Router();

mainRouter.use('/auth', authRouter)
mainRouter.use('/student', studentRouter);
mainRouter.use('/employee', employeeRouter);
mainRouter.use('/role', roleRouter);
mainRouter.use('/department', departmentRouter);
mainRouter.use('/class', classRouter);
mainRouter.use('/courses', courseRouter);
// Use other routers as needed

export default mainRouter;