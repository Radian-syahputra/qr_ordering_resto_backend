import z from "zod";
import { OrderStatus } from "../../generated/prisma/enums";

export const orderItemSchema = z.object({
    menuId : z.string().min(1, 'Menu Wajib Di isi'),
    quantity : z.coerce.number().int('Qantity Harus Bertipe Number').min(1, "Minimal Pesan 1"),
    note : z.string().optional()
})

export const createOrderSchema = z.object({
  tableId: z.string().min(1, "Pilih Meja"),
  items: z.array(orderItemSchema).min(1, "Order Item Wajib Di isi")
})

export const updateOrderStatusSchema = z.object({
  status : z.enum(OrderStatus)
})