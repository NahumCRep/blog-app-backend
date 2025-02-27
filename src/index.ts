require('dotenv').config();
// const express = require("express");
import express, { Express, Request, Response } from "express";
const helmet = require('helmet');
const cors = require("cors");
const { rateLimit } = require("express-rate-limit");
const authMiddleware = require('./modules/auth/authMiddleware');

const app: Express = express();

// * Security Middlewares *****************************************

app.use(helmet());
app.use(cors());

const limiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    limit: 10, // each IP can make up to 10 requests per `windowsMs` (5 minutes)
    standardHeaders: true, // add the `RateLimit-*` headers to the response
    legacyHeaders: false, // remove the `X-RateLimit-*` headers from the response
});
app.use(limiter);

// * ***************************************************************

app.use(express.json());
app.use(express.static('public'));


app.use('/api/auth', require("./modules/auth/authRoutes"));

app.get('/hello', authMiddleware, (req: Request, res: Response) => {
    res.json({ message: "hello" })
})

const PORT = process.env.PORT || 4000
app.listen(PORT, () => console.log(`server up on port ${PORT}`));
