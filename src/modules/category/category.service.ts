import { prisma } from "../../config/prisma";


export const createCategoryService = async (name : string) => {
    const existCategory = await prisma.category.findUnique({
        where : {name}
    })
    if(existCategory) {
        throw new Error("Kategori Sudah Ada")
    }

    const newCategory = await prisma.category.create({
        data :{
            name
        }
    })

    return newCategory
}


export const getAllCategoryService = async () => {
    const categories = await prisma.category.findMany({
        orderBy : {
            name : 'asc'
        }
    })

    return categories
}


export const getCategoryByIdService = async (id : string) => {
    const category = await prisma.category.findUnique({
        where : {id}
    })

    if(!category) {
        throw new Error('Kategori Tidak Ditemukan')
    }

    return category
}


export const updateCategoryService = async (id: string, name: string) => {
  const category = await prisma.category.findUnique({ where: { id } });
  if (!category) {
    throw new Error("Kategori tidak ditemukan");
  }

  const sameCategory = await prisma.category.findUnique({ where: { name } });
  if (sameCategory && sameCategory.id !== id) {
    throw new Error("Nama kategori sudah dipakai");
  }

  const updated = await prisma.category.update({
    where: { id },
    data: { name },
  });

  return updated;
};

export const deleteCategoryService = async (id : string) => {
    const category = await prisma.category.findUnique({where : {id}});
    if(!category) {
        throw new Error("Kategori Tidak Ditemukan")
    }

    await prisma.category.delete({where : {id}})
}