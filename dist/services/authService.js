"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client_1 = require("@prisma/client");
const env_1 = require("../config/env");
const prisma = new client_1.PrismaClient();
exports.authService = {
    async register(email, password) {
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            throw new Error("E-mail já registrado");
        }
        const hashedPassword = await bcrypt_1.default.hash(password, 12);
        return prisma.user.create({
            data: { email, password: hashedPassword },
        });
    },
    async login(email, password) {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            throw new Error("Credenciais inválidas");
        }
        const match = await bcrypt_1.default.compare(password, user.password);
        if (!match) {
            throw new Error("Credenciais inválidas");
        }
        const token = jsonwebtoken_1.default.sign({ userId: user.id, email: user.email }, env_1.JWT_SECRET, {
            expiresIn: "2h",
        });
        return { token, user };
    },
};
