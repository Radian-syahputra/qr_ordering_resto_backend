import { Request, Response } from "express";
import { successResponse, errorResponse } from "../../utils/response";
import { exportOrdersToExcelService, getDashboardService } from "./dashboard.service";

export const getDashboardController = async (req : Request, res : Response) => {
    try {
        const {period} = req.query
        const dashboard = await getDashboardService(period as string)

        return successResponse(res, 'Dashboard Berhasil Di Generate', dashboard)
    } catch (error : any) {
        return errorResponse(res, error.message)
    }
}

export const exportOrdersToExcelController = async (req: Request, res: Response) => {
  try {
    const { period } = req.query;
    const workbook = await exportOrdersToExcelService(period as string);

    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
    res.setHeader('Content-Disposition', 'attachment; filename=laporan-penjualan.xlsx');

    await workbook.xlsx.write(res);
    res.end();
  } catch (error: any) {
    return errorResponse(res, error.message);
  }
};