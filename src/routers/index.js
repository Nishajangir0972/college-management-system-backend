import express from "express";
import studentRouter from "./student-router.js";
import employeeRouter from "./employee-router.js";
import authRouter from "./auth-router.js";

const mainRouter = express.Router();

mainRouter.use('/auth', authRouter)
mainRouter.use('/student', studentRouter);
mainRouter.use('/employee', employeeRouter);
// Use other routers as needed

export default mainRouter;