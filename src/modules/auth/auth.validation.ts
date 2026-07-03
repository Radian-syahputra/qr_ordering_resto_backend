import z from "zod";

export const registerSchema = z.object({
    name : z.string().trim().min(1, "Nama Wajib Diisi"),
    email : z.string().trim().email("Email tidak valid"),
    password : z.string().min(8, "Password minimal 8 karakter")
})

export const loginSchema = z.object({
    email : z.string().trim().email("Email tidak valid"),
    password : z.string().min(8, "Password minimal 8 karakter")
})