import { Request, Response } from "express";
import { globalMetricsService } from "../services/globalMetricsService";

const GlobalMetricsController = {
  getGlobalMetrics: async (req: Request, res: Response) => {
    try {
      const data = await globalMetricsService.fetchGlobalMetrics();
      res.json({
        source: "CoinMarketCap",
        data,
      });
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Erro desconhecido";
      console.error("Erro na GlobalMetricsController:", message);
      res.status(500).json({ error: message });
    }
  },
};

export { GlobalMetricsController };
