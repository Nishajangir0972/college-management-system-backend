import express from "express";
import studentRouter from "./student-router.js";
import employeeRouter from "./employee-router.js";

const mainRouter = express.Router();

mainRouter.use('/students', studentRouter);
mainRouter.use('/employees', employeeRouter);
// Use other routers as needed

export default mainRouter;