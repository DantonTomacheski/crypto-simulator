import { Request, Response, NextFunction } from "express";
import { marketService } from "../services/marketService";

const marketController = {
  getMarketData: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await marketService.fetchMarketData();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: "Erro ao obter dados do mercado" });
    }
  },
};

export default marketController;
