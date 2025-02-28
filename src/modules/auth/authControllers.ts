import { Request, Response } from "express";
import { statusCodes } from "../../constants/statusCodes";
import { registerUser, loginUser } from "./authService";

const loginUserController = async (req: Request, res: Response) => {
    const credentials = req.body;
    const { email, password } = credentials;
    const response = await loginUser(email, password);
    res.status(statusCodes.OK).json(response);
}

const registerUserController = async (req: Request, res: Response) => {
    const data = req.body;
    const response = await registerUser(data)
    res.status(statusCodes.CREATED).json({ message: "User registration success", user: response });
}

export {
    loginUserController,
    registerUserController,
}