require('dotenv').config();
import express, { Express, Request, Response } from "express";
import helmet from "helmet";
import cors from "cors";
import errorHandler from "./middlewares/errorHandler";
import authMiddleware from "./modules/auth/authMiddleware";
import { rateLimit } from "express-rate-limit";
import runMigrations from "./database/migrations/migrations";
import authRoutes from "./modules/auth/authRoutes";

runMigrations();

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


// app.use('/api/auth', require("./modules/auth/authRoutes"));
app.use('/api/auth', authRoutes);

app.get('/hello', authMiddleware, (req: Request, res: Response) => {
    res.json({ message: "hello" })
})

app.use(errorHandler);

const PORT = process.env.PORT || 4000
app.listen(PORT, () => console.log(`server up on port ${PORT}`));
