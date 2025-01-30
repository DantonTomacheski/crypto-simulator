import { Request, Response, NextFunction } from "express";
import { CoinData } from "../types/coin.types";
import {
  mktCapGainersService,
  mktCaplosersService,
} from "../services/MarketCapServices";

const MarketCapController = {
  getTopMarketCap: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await mktCapGainersService.fetchTopGainers();

      const formattedData: CoinData[] = data.map((coin) => ({
        id: coin.id,
        symbol: coin.symbol,
        name: coin.name,
        current_price: coin.current_price,
        current_price_formatted: coin.current_price_formatted,
        price_change_percentage_24h: coin.price_change_percentage_24h,
        sparkline_in_7d: coin.sparkline_in_7d,
        image: coin.image,
      }));

      res.json({ source: "CoinGecko", data: formattedData });
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Erro desconhecido";
      res.status(500).json({ error: message });
    }
  },
  getLowMarketCap: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await mktCaplosersService.fetchTopLosers();

      const formattedData: CoinData[] = data.map((coin) => ({
        id: coin.id,
        symbol: coin.symbol,
        name: coin.name,
        current_price: coin.current_price,
        current_price_formatted: coin.current_price_formatted,
        price_change_percentage_24h: coin.price_change_percentage_24h,
        sparkline_in_7d: coin.sparkline_in_7d,
        image: coin.image,
      }));

      res.json({ source: "CoinGecko", data: formattedData });
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Erro desconhecido";
      res.status(500).json({ error: message });
    }
  },
};

export { MarketCapController };
