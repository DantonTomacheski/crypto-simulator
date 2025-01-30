import { Request, Response, NextFunction } from "express";
import { trendingService } from "../services/trendingService";
import { FormattedCoin } from "../types/trending.types";

const trendingController = {
  getTrending: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const trendingCoins = await trendingService.fetchTrending();

      const formattedData: FormattedCoin[] = trendingCoins.map((coin) => ({
        symbol: coin.item.symbol,
        marketCapRank: coin.item.market_cap_rank,
        priceUSD: coin.item.data.price,
        priceChange24h: coin.item.data.price_change_percentage_24h.usd, // Pega variação percentual 24h em USD
        sparkline: coin.item.data.sparkline,
        smallIcon: coin.item.small,
        mediumIcon: coin.item.thumb,
      }));

      res.json({
        source: "CoinGecko",
        data: formattedData,
      });
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Erro desconhecido";
      res.status(500).json({
        error: errorMessage,
      });
    }
  },
};

export { trendingController };
