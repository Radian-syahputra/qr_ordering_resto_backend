import { AuthRequest } from "./auth";
import { Response, NextFunction } from "express";
import { errorResponse } from "../utils/response";


export const authorizeRole  = (allowedRoles : string[]) => {
    return (req : AuthRequest, res : Response, next : NextFunction) => {
        const userRole = req.user?.role
        if(!userRole || !allowedRoles.includes(userRole)) {
            return errorResponse(res, "Forbidden", 403)
        }
        next();
    }
}