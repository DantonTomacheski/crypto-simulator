import { Request, Response, NextFunction } from "express";
import { trendingService } from "../services/trendingService";

// Tipo para as moedas formatadas
interface FormattedCoin {
  id: string;
  name: string;
  symbol: string;
  marketCapRank: number;
  priceBTC: number;
}

const trendingController = {
  getTrending: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const trendingCoins = await trendingService.fetchTrending();

      const formattedData: FormattedCoin[] = trendingCoins.map((coin) => ({
        id: coin.item.id,
        name: coin.item.name,
        symbol: coin.item.symbol,
        marketCapRank: coin.item.market_cap_rank,
        priceBTC: coin.item.price_btc,
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
