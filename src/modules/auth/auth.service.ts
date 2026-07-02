import { prisma } from "./../../config/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerService = async (
  name: string,
  email: string,
  password: string
) => {
  // cek apakah email sudah terdaftar
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });
  if (existingUser) {
    throw new Error("Email sudah terdaftar");
  }

  // hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // buat user baru
  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
    select: {
      id: true,
      name: true,
      email: true,
    },
  });
  return newUser;
};

export const loginService = async (email: string, password: string) => {
  // cek apakah email terdaftar
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new Error("Email Atau Pasword Salah");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Email Atau Pasword Salah");
  }

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET!,
    {
      expiresIn: "7d",
    }
  );

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  };
};


export const getMeService = async (userId : string) => {
    const user = await prisma.user.findUnique({
        where : {id : userId},
        select : {
            id : true,
            name : true,
            email : true,
            role : true
        }
    })

    if(!user) {
        throw new Error("User tidak ditemukan")
    }

    return user
}