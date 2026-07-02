import { errorResponse } from "../utils/response"
import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from "express"

export interface AuthRequest extends Request {
    user? : {
        id: string,
        role: string
    }
}

export const authenticate = (req : AuthRequest, res : Response, next : NextFunction) => {
    try {
        const token= req.cookies.token
        if(!token) {
            return errorResponse(res, "Unauthorized", 401)
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string, role: string }
        req.user = decoded

        next()

    } catch (error : any) {
        return errorResponse(res, error.message, 401)
    }
}