import { Request, Response } from "express";
import { successResponse, errorResponse } from "../../utils/response";
import {
  createCategoryService,
  getAllCategoryService,
  getCategoryByIdService,
  deleteCategoryService,
  updateCategoryService,
} from "./category.service";

export const createCategoryController = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    const category = await createCategoryService(name);
    return successResponse(res, "berhasil membuat category", category, 201);
  } catch (error: any) {
    return errorResponse(res, error.message);
  }
};

export const getAllCategoryController = async (req: Request, res: Response) => {
  try {
    const categories = await getAllCategoryService();
    return successResponse(
      res,
      "berhasil mendapatkan semua kategori",
      categories
    );
  } catch (error: any) {
    return errorResponse(res, error.message);
  }
};

export const getCategoryByIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    const category = await getCategoryByIdService(id as string);

    return successResponse(res, "berhasil mendapatkan kategori", category);
  } catch (error: any) {
    return errorResponse(res, error.message);
  }
};

export const updateCategoryController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const updated = await updateCategoryService(id as string, name);
    return successResponse(res, "berhasil update kategori", updated);
  } catch (error: any) {
    return errorResponse(res, error.message);
  }
};

export const deleteCategoryController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await deleteCategoryService(id as string);
    return successResponse(res, "Kategori berhasil dihapus");
  } catch (error: any) {
    return errorResponse(res, error.message);
  }
};
