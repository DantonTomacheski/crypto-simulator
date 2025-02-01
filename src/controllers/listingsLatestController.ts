import { Request, Response } from "express";
import { listingsLatestService } from "../services/listingsLatestService";

const ListingsLatestController = {
  getListingsLatest: async (req: Request, res: Response) => {
    try {
      const data = await listingsLatestService.fetchListingsLatest();
      res.json({
        source: "CoinMarketCap",
        data,
      });
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Erro desconhecido";
      console.error("Erro na ListingsLatestController:", message);
      res.status(500).json({ error: message });
    }
  },
};

export { ListingsLatestController };
