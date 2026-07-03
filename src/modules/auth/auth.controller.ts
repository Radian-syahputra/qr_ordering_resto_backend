import { Request, Response } from "express";
import { successResponse, errorResponse } from "../../utils/response";
import { getMeService, loginService, registerService } from "./auth.service";
import { AuthRequest } from "../../middlewares/auth";

export const registerController = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const user = await registerService(name, email, password);
    return successResponse(res, "User registered successfully", user, 201);
  } catch (error: any) {
    return errorResponse(res, error.message);
  }
};

export const loginController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body

    const { token, user } = await loginService(email, password);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 hari
    });

    return successResponse(res, "Login Berhasil", user);
  } catch (error: any) {
    return errorResponse(res, error.message);
  }
};

export const logoutController = (req: Request, res: Response) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    return successResponse(res, "Logout Berhasil");
  } catch (error: any) {
    return errorResponse(res, error.message);
  }
};


export const getMeController = async (req : AuthRequest, res : Response) => {
    try {
        const userId = req.user?.id
        if(!userId) {
            return errorResponse(res, "Unauthorized", 401)
        }

        const user = await getMeService(userId)
        return successResponse(res, "User ditemukan", user)
    } catch (error : any) {
        return errorResponse(res, error.message);
    }
}