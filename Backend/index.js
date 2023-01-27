import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from 'cors';
import config from './config.js';
import userRouter from "./routers/userRouter.js";

// =================================================//
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ================================================//


const app = express();

app.use(bodyParser.json());
// app.use(bodyParser.urlencoded());
app.use(cors());

app.use('/users', userRouter);
// const CONNECTION_URL = 'mongodb://localhost:27017/memories';process.env.CONNECTION_URL

const PORT = config.PORT || 9000;

// ==============================================================//
// make frontend folder to static :
app.use(express.static(path.join(__dirname, '/../frontend/build')));

// also make the index.html as starting file:
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/../frontend/build/index.html'));
});

// ===============================================================//


mongoose.set("strictQuery", false);
mongoose.connect(config.MONGODB_URL)
    .then(() => {
        console.log('connected to mongodb');
        app.listen(PORT, () => {
            console.log(`server is running at: http://localhost:${PORT}`)
        })
    })
    .catch((error) => {
        console.log('error is: ', error.message)
    });