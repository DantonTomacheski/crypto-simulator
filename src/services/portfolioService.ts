import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const portfolioService = {
  async addAsset(userId: string, symbol: string, amount: number) {
    return prisma.portfolio.create({
      data: { userId, symbol, amount },
    });
  },

  async getPortfolio(userId: string) {
    return prisma.portfolio.findMany({ where: { userId } });
  },
};
