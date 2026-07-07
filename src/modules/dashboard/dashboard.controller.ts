import { Request, Response } from "express";
import { successResponse, errorResponse } from "../../utils/response";
import { getDashboardService } from "./dashboard.service";

export const getDashboardController = async (req : Request, res : Response) => {
    try {
        const {period} = req.query
        const dashboard = await getDashboardService(period as string)

        return successResponse(res, 'Dashboard Berhasil Di Generate', dashboard)
    } catch (error : any) {
        return errorResponse(res, error.message)
    }
}