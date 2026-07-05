import { Router } from "express";
import { authenticate } from "../../middlewares/auth";
import { authorizeRole } from "../../middlewares/role";
import { validateRequest } from "../../middlewares/validate";
import { createMenuSchema, updateMenuSchema } from "./menu.validation";
import { createMenuController, getAllMenuController, getMenuByIdController, updateMenuController, deleteMenuController } from "./menu.controller";
import upload from "../../config/multer";

const router = Router()

// Public Route
router.get('/', getAllMenuController)
router.get('/:id', getMenuByIdController)

// Admin Only
router.post('/', authenticate, authorizeRole(['ADMIN']), upload.single('image'), validateRequest(createMenuSchema), createMenuController)
router.put('/:id', authenticate, authorizeRole(['ADMIN']), upload.single('image'), validateRequest(updateMenuSchema), updateMenuController)
router.delete('/:id', authenticate, authorizeRole(['ADMIN']), deleteMenuController)

export default router