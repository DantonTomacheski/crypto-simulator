import { Request, Response, NextFunction } from "express";
import { losersService } from "../services/losersService";
import { CoinGeckoMarketData } from "../types/gainers.types";

const losersController = {
  getTopLosers: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await losersService.fetchTopLosers();

      const formattedData: CoinGeckoMarketData[] = data.map((coin) => ({
        id: coin.id,
        symbol: coin.symbol,
        name: coin.name,
        current_price: coin.current_price,
        price_change_percentage_24h: coin.price_change_percentage_24h,
        image: coin.image,
      }));

      const displayData = formattedData.map((coin) => ({
        ...coin,
        current_price_formatted: `$${coin.current_price.toFixed(2)}`,
        change24h: `${coin.price_change_percentage_24h.toFixed(1)}%`,
      }));

      res.json({ source: "CoinGecko", data: displayData });
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Erro desconhecido";
      res.status(500).json({ error: message });
    }
  },
};

export default losersController;
