import { Request, Response } from "express";
import { generateToken } from "../../utils/tokenUtils";
import { statusCodes } from "../../constants/statusCodes";
import AppError from "../../utils/appError";

const loginUser = async (req: Request, res: Response) => {
    const credentials = req.body;
    const { email, password } = credentials;
    const token = generateToken({ email });
    // throw new AppError("test error app error", statusCodes.BAD_REQUEST);
    res.json({ token })
}

export {
    loginUser
}