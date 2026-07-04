import z from "zod";


export const createMenuSchema = z.object({
    name : z.string().trim().min(1 , 'Nama Menu Wajib Di isi'),
    description : z.string().trim().min(1 , 'Deskripsi Wajib Di isi'),
    price: z.coerce.number().int("Harga harus berupa angka bulat").min(0, "Harga tidak boleh negatif"),
    categoryId : z.string().min(1 , "Wajib Pilih Kategori"),
    available: z.string().optional().transform((val) => val === undefined ? true : val === 'true'),
})

// coerce mengubah string ke int "12121" => 12121 


export const updateMenuSchema = createMenuSchema.partial()