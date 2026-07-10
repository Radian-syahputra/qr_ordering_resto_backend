import { Router } from "express";
import { authenticate } from "../../middlewares/auth";
import { authorizeRole } from "../../middlewares/role";
import { exportOrdersToExcelController, getDashboardController } from "./dashboard.controller";

const router = Router()

router.get('/', authenticate, authorizeRole(['ADMIN', 'STAFF']), getDashboardController)
router.get('/export', authenticate, authorizeRole(['ADMIN', 'STAFF']), exportOrdersToExcelController)

export default router