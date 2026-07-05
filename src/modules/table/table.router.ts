import { Router } from "express";
import { authenticate } from "../../middlewares/auth";
import { authorizeRole } from "../../middlewares/role";
import { validateRequest } from "../../middlewares/validate";
import { createTableSchema } from "./table.validation";
import { getAllTableController, createTableController, getTableByIdController, updateTableController, deleteTableController } from "./table.controller";

const router = Router()

router.get('/', authenticate, authorizeRole(['ADMIN', 'STAFF']), getAllTableController)
router.get('/:id', authenticate, authorizeRole(['ADMIN', "STAFF"]), getTableByIdController)

router.post('/', authenticate, authorizeRole(['ADMIN']), validateRequest(createTableSchema), createTableController)
router.put('/:id', authenticate, authorizeRole(['ADMIN']), validateRequest(createTableSchema), updateTableController)
router.delete('/:id', authenticate, authorizeRole(['ADMIN']), deleteTableController)

export default router