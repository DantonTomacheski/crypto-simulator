import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { JWT_SECRET } from "../config/env";

const prisma = new PrismaClient();

export const authService = {
  async register(email: string, password: string) {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      throw new Error("E-mail já registrado");
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    return prisma.user.create({
      data: { email, password: hashedPassword },
    });
  },

  async login(email: string, password: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new Error("Credenciais inválidas");
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw new Error("Credenciais inválidas");
    }

    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "2h",
    });

    return { token, user };
  },
};
