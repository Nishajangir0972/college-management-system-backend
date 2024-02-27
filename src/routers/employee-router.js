import express from "express";
import employeeModel from "../models/employee-model.js";

const employeeRouter = express.Router();

employeeRouter.get('/', async (req, res) => {
    const data = await employeeModel.find();
    res.json({ message: "hello", data })
})

export default employeeRouter;