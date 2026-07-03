import { Router } from "express";
import { authenticate } from "../../middlewares/auth";
import { authorizeRole } from "../../middlewares/role";
import {
  createCategoryController,
  getAllCategoryController,
  getCategoryByIdController,
  updateCategoryController,
  deleteCategoryController,
} from "./category.controller";
import { createCategorySchema } from "./category.validation";
import { validateRequest } from "../../middlewares/validate";

const router = Router();

// Public Route
router.get("/", getAllCategoryController);
router.get("/:id", getCategoryByIdController);

// Admin and Staff Route
router.post(
  "/",
  authenticate,
  authorizeRole(["ADMIN", "STAFF"]),
  validateRequest(createCategorySchema),
  createCategoryController
);
router.put(
  "/:id",
  authenticate,
  authorizeRole(["ADMIN", "STAFF"]),
  validateRequest(createCategorySchema),
  updateCategoryController
);
router.delete(
  "/:id",
  authenticate,
  authorizeRole(["ADMIN", "STAFF"]),
  deleteCategoryController
);

export default router;
