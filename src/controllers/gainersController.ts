import { Request, Response, NextFunction } from "express";
import { gainersService } from "../services/gainersService";

interface FormattedGainer {
  name: string;
  price: string;
  change24h: string;
}

const gainersController = {
  getTopGainers: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await gainersService.fetchTopGainers();

      const formattedData: FormattedGainer[] = data.map((coin) => ({
        name: coin.name,
        price: `$${coin.current_price.toFixed(2)}`,
        change24h: `${coin.price_change_percentage_24h.toFixed(1)}%`,
      }));

      res.json({ source: "CoinGecko", data: formattedData });
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Erro desconhecido";
      res.status(500).json({ error: message });
    }
  },
};

export default gainersController;
