import z from "zod";


export const createTableSchema = z.object({
    name : z.string().trim().min(1, 'Masukan Nama Meja')
})