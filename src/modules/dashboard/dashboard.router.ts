import { Router } from "express";
import { authenticate } from "../../middlewares/auth";
import { authorizeRole } from "../../middlewares/role";
import { getDashboardController } from "./dashboard.controller";

const router = Router()

router.get('/', authenticate, authorizeRole(['ADMIN', 'STAFF']), getDashboardController)

export default router