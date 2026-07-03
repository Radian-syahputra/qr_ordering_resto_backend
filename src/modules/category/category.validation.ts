import z from "zod";


export const createCategorySchema  = z.object({
    name : z.string().trim().min(1, "Nama kategori wajib di isi")
})