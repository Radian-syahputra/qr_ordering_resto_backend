import { Router } from "express";
import { authenticate } from "../../middlewares/auth";
import { authorizeRole } from "../../middlewares/role";
import { validateRequest } from "../../middlewares/validate";
import { createOrderSchema,updateOrderStatusSchema } from "./order.validation";
import { createOrderController, getAllOrderController, getOrderByIdController, updateOrderStatusController } from "./order.controller";


const router = Router()

// Public Route
router.post('/', validateRequest(createOrderSchema), createOrderController)

// Admin Or Staff Route
router.get('/', authenticate, authorizeRole(['ADMIN', 'STAFF']), getAllOrderController)
router.get('/:id', authenticate, authorizeRole(["ADMIN", "STAFF"]), getOrderByIdController)
router.patch('/:id/status', authenticate, authorizeRole(["STAFF"]), validateRequest(updateOrderStatusSchema), updateOrderStatusController)

export default router