import { Request, Response, NextFunction } from "express";
import { portfolioService } from "../services/portfolioService";

const portfolioController = {
  addToPortfolio: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = (req as any).user.userId;
      const { symbol, amount } = req.body;

      const portfolio = await portfolioService.addAsset(userId, symbol, amount);
      res.status(201).json({ message: "Ativo adicionado", portfolio });
    } catch (error) {
      res.status(500).json({ error: "Erro ao adicionar ativo ao portfólio" });
    }
  },

  getPortfolio: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = (req as any).user.userId;
      const portfolio = await portfolioService.getPortfolio(userId);
      res.json(portfolio);
    } catch (error) {
      res.status(500).json({ error: "Erro ao obter portfólio" });
    }
  },
};

export default portfolioController;
