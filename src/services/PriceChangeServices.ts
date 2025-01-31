import { CoinData } from "../types/coin.types";

export const priceChangeService = {
  async fetchTopGainersAndLosers(): Promise<{
    gainers: CoinData[];
    losers: CoinData[];
  }> {
    try {
      const response = await fetch(
        `${process.env.GECKO_COIN_BASE_URL}/v3/coins/markets?vs_currency=usd&per_page=100&page=1&sparkline=true&price_change_percentage=24h`
      );

      if (!response.ok) {
        throw new Error("Falha ao buscar dados");
      }

      const coins = (await response.json()) as CoinData[];

      const gainers = [...coins]
        .sort(
          (a, b) =>
            (b.price_change_percentage_24h || 0) -
            (a.price_change_percentage_24h || 0)
        )
        .slice(0, 8);

      const losers = [...coins]
        .sort(
          (a, b) =>
            (a.price_change_percentage_24h || 0) -
            (b.price_change_percentage_24h || 0)
        )
        .slice(0, 8);

      return { gainers, losers };
    } catch (error) {
      console.error("Erro no priceChangeService:", error);
      throw new Error("Erro interno");
    }
  },
};
