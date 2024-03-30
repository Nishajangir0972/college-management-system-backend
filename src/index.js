import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { ConfigData } from './config/config.js';
import mainRouter from "./routers/index.js";
import swaggerUi from 'swagger-ui-express';
import { apiDocumentation } from "./documentations/apidoc.js";

const app = express();
const connection = mongoose.connect(ConfigData.database.dsn)
app.use(cors());
app.use('/uploads', express.static('uploads'));
app.use(express.json());

app.use(mainRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(apiDocumentation));

app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'Server responding correctly.'
    })
})

connection
    .then(() => {
        app.listen(ConfigData.port, () => console.log(`Server has been started on Port : ${ConfigData.port}`))
    })
    .catch((err) => console.log(err));