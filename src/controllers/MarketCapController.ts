import { Request, Response, NextFunction } from "express";
import { gainersService } from "../services/gainersService";
import { mktCaplosersService } from "../services/losersService";
import { CoinData } from "../types/coin.types";

const MarketCapController = {
  getTopMarketCap: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await gainersService.fetchTopGainers();

      const formattedData: CoinData[] = data.map((coin) => ({
        id: coin.id,
        symbol: coin.symbol,
        name: coin.name,
        current_price: coin.current_price,
        current_price_formatted: coin.current_price_formatted,
        price_change_percentage_24h: coin.price_change_percentage_24h,
        sparkline_in_7d: coin.sparkline_in_7d,
        change24h: coin.change24h,
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
        change24h: coin.change24h,
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
