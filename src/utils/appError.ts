import { statusCodes } from "../constants/statusCodes";

type TStatusCode = typeof statusCodes[keyof typeof statusCodes];

class AppError extends Error {
    statusCode: TStatusCode;
    isOperational: boolean;

    constructor(message: string, statusCode: TStatusCode) {
        super(message);
        this.name = this.constructor.name;
        this.statusCode = statusCode || 500;
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }
}

export default AppError;