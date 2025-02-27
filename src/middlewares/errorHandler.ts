import { Request, Response, NextFunction } from "express";
import AppError from "../utils/appError";

const errorHandler = (error: any, req: Request, res: Response, next: NextFunction) => {
    console.log(error);

    if (error instanceof AppError) {
        return res.status(error.statusCode).json({
            error: error.message,
        });
    }

    return res.status(500).send("Internal Server Error");
};

module.exports = errorHandler;