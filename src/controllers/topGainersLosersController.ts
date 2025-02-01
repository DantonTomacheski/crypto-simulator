import { Request, Response } from "express";
import { CoinData } from "../types/coin.types";
import { topGainersLosersService } from "../services/topGainersLosersService";

const TopGainersLosersController = {
  getTopGainersAndLosers: async (req: Request, res: Response) => {
    try {
      const { gainers, losers } =
        await topGainersLosersService.fetchTopGainersAndLosers();

      const formatCoinData = (coin: CoinData) => ({
        id: coin.id,
        symbol: coin.symbol,
        name: coin.name,
        current_price: coin.current_price,
        current_price_formatted: coin.current_price_formatted,
        price_change_percentage_24h: coin.price_change_percentage_24h,
        image: coin.image,
        sparkline_in_7d: coin.sparkline_in_7d,
      });

      res.json({
        source: "CoinMarketCap",
        data: {
          top_gainers: gainers.map(formatCoinData),
          top_losers: losers.map(formatCoinData),
        },
      });
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Erro desconhecido";
      console.error("Erro na controller:", message);
      res.status(500).json({ error: message });
    }
  },
};

export { TopGainersLosersController };
