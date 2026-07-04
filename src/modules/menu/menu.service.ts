import cloudinary from "../../config/cloudinary";
import { prisma } from "../../config/prisma";
import cloudinaryUpload from "../../utils/cloudinaryUpload";

interface CreateMenuInput {
  name: string;
  price: number;
  description: string;
  categoryId: string;
  available: boolean;
}

interface UpdateMenuInput {
  name?: string;
  price?: number;
  description?: string;
  categoryId?: string;
  available?: boolean;
}

export const createMenuService = async (
  data: CreateMenuInput,
  file: Express.Multer.File
) => {
  const category = await prisma.category.findUnique({
    where: { id: data.categoryId },
  });

  if (!category) {
    throw new Error("Kategory Tidak Di Temukan");
  }

  const image = await cloudinaryUpload(file.buffer);
  const menu = await prisma.menu.create({
    data: {
      name: data.name,
      price: data.price,
      description: data.description,
      categoryId: data.categoryId,
      available: data.available,
      imageUrl: image.imageUrl,
      imagePublicId: image.imagePublicId,
    },
    include: {
      category: true,
    },
  });

  return menu;
};

export const getAllMenuService = async (search?: string, category?: string) => {
  const menus = await prisma.menu.findMany({
    where: {
      ...(search && {
        name: {
          contains: search,
          mode: "insensitive",
        },
      }),
      ...(category && {
        categoryId: category,
      }),
    },
    include: {
      category: true,
    },
    orderBy: {
      name: "asc",
    },
  });

  return menus;
};

export const getMenuByIdService = async (id: string) => {
  const menu = await prisma.menu.findUnique({
    where: { id },
    include: {
      category: true,
    },
  });

  if (!menu) {
    throw new Error("Menu Tidak Ditemukan");
  }

  return menu;
};

export const updateMenuService = async (
  data: UpdateMenuInput,
  id: string,
  file?: Express.Multer.File
) => {
  const existMenu = await prisma.menu.findUnique({ where: { id } });
  if (!existMenu) {
    throw new Error("Menu Tidak Ditemukan");
  }

  if (data.categoryId) {
    // <- baru cek DI SINI, sebelum dipakai
    const category = await prisma.category.findUnique({
      where: { id: data.categoryId },
    });
    if (!category) {
      throw new Error("Category Tidak Ditemukan");
    }
  }

  let imageUrl = existMenu.imageUrl;
  let imagePublicId = existMenu.imagePublicId;

  if (file) {
    const uploadResult = await cloudinaryUpload(file.buffer);
    await cloudinary.uploader.destroy(existMenu.imagePublicId);

    imageUrl = uploadResult.imageUrl;
    imagePublicId = uploadResult.imagePublicId;
  }

  const updatedMenu = await prisma.menu.update({
    where: { id },
    data: { ...data, imageUrl, imagePublicId },
    include: {
      category: true,
    },
  });

  return updatedMenu;
};


export const deleteMenuService = async (id : string) => {
    const existMenu = await prisma.menu.findUnique({
        where : {id}
    })
    if(!existMenu) {
        throw new Error('Menu Tidak Di Temukan')
    }

    await cloudinary.uploader.destroy(existMenu.imagePublicId)
    await prisma.menu.delete({where : {id}})

    return
}