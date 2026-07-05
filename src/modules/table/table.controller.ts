import { Request, Response } from "express";
import { successResponse, errorResponse } from "../../utils/response";
import { createTableService,getAllTableService, getTableByIdService, updateTableService, deleteTableService } from "./table.service";


export const createTableController = async (req : Request, res : Response) => {
    try {
        const {name} = req.body

        const newTable = await createTableService(name)
        return successResponse(res, 'Berhasil Membuat Meja', newTable, 201)
    } catch (error : any) {
        return errorResponse(res, error.message)
    }
}

export const getAllTableController = async (req : Request, res : Response) => {
    try {
        const {search} = req.query
        const tables = await getAllTableService(search as string)

        return successResponse(res, "Berhasil Mengambil Data Semua Meja", tables)
    } catch (error : any) {
        return errorResponse(res, error.message)
    }
}


export const getTableByIdController = async (req : Request, res : Response) => {
    try {
        const {id} = req.params
        const table = await getTableByIdService(id as string)

        return successResponse(res, 'Berhasil Mengambil Data Meja', table)
    } catch (error : any) {
        return errorResponse(res, error.message)
    }
}


export const updateTableController = async (req : Request, res : Response) => {
    try {
        const {id} = req.params
        const {name} = req.body

        const table = await updateTableService(name, id as string)
        return successResponse(res, 'Data Meja Berhasil Di Update', table)
    } catch (error : any) {
        return errorResponse(res, error.message)
    }
}


export const deleteTableController  = async (req : Request, res : Response) => {
    try {
        const {id} = req.params

        await deleteTableService(id as string)

        return successResponse(res, 'Berhasil Menghapus Meja')
    } catch (error : any) {
        return errorResponse(res, error.message)
    }
}