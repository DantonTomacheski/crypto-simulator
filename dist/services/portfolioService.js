"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.portfolioService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
exports.portfolioService = {
    async addAsset(userId, symbol, amount) {
        return prisma.portfolio.create({
            data: { userId, symbol, amount },
        });
    },
    async getPortfolio(userId) {
        return prisma.portfolio.findMany({ where: { userId } });
    },
};
