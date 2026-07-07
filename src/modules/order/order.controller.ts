import { Request, Response } from "express";
import { successResponse, errorResponse } from "../../utils/response";
import { createOrderService, getAllOrderService, getOrderByIdService, updateOrderStatus } from "./order.service";


export const createOrderController = async (req : Request, res : Response) => {
    try {
        const {tableId, items} = req.body
        const order = await createOrderService({tableId, items})

        return successResponse(res, 'Berhasil membuat pesanan', order, 201)
    } catch (error : any) {
        return errorResponse(res, error.message)
    }
}

export const getAllOrderController = async (req : Request, res : Response ) => {
    try {
        const {search} = req.query
        const orders = await getAllOrderService(search as string)

        return successResponse(res, 'Semua Order Di Dapatkan', orders)
    } catch (error : any) {
        return errorResponse(res, error.message)
    }
}


export const getOrderByIdController = async (req : Request, res : Response) => {
    try {
        const {id} = req.params
        const order = await getOrderByIdService(id as string)

        return successResponse(res, 'Order Di Dapatkan', order)
    } catch (error : any) {
        return errorResponse(res, error.message)
    }
}

export const updateOrderStatusController = async (req : Request, res : Response) => {
    try {
    const {id} = req.params
    const {status} = req.body
    const orderStatus = await updateOrderStatus(id as string, status)
    
    return successResponse(res, 'Berhasil Mengupdate Status Order', orderStatus)
    } catch (error : any) {
        return errorResponse(res, error.message)
    }
}