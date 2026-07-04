import { Request, Response } from "express";
import { successResponse, errorResponse } from "../../utils/response";
import {
  createMenuService,
  getAllMenuService,
  getMenuByIdService,
  updateMenuService,
  deleteMenuService,
} from "./menu.service";

export const createMenuController = async (req: Request, res: Response) => {
  try {
    const { name, price, description, categoryId, available } = req.body;
    const file = req.file;
    if (!file) {
      return errorResponse(res, "Foto Wajib Di Tambahkan", 400);
    }

    const menu = await createMenuService(
      { name, price, description, categoryId, available },
      file
    );

    return successResponse(res, "Berhasil Menabahkan Menu", menu, 201);
  } catch (error: any) {
    return errorResponse(res, error.message);
  }
};

export const getAllMenuController = async (req: Request, res: Response) => {
  try {
    const { search, category } = req.query;

    const menus = await getAllMenuService(search as string, category as string);
    return successResponse(res, "Semua Menu Berhasil", menus);
  } catch (error: any) {
    return errorResponse(res, error.message);
  }
};

export const getMenuByIdController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const menu = await getMenuByIdService(id as string);

    return successResponse(res, "Menu Berhasil Di Dapatkan", menu);
  } catch (error: any) {
    return errorResponse(res, error.message);
  }
};

export const updateMenuController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, price, description, categoryId, available } = req.body;
    const file = req.file;

    const updatedMenu = await updateMenuService(
      { name, price, description, categoryId, available },
      id as string,
      file
    );

    return successResponse(res, "Berhasil update menu ", updatedMenu);
  } catch (error: any) {
    return errorResponse(res, error.message);
  }
};

export const deleteMenuController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await deleteMenuService(id as string);

    return successResponse(res, "Berhasil menghapus Menu");
  } catch (error: any) {
    return errorResponse(res, error.message);
  }
};
