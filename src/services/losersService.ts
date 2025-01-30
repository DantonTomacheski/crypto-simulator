import fetch from "node-fetch";

interface CoinGeckoMarketData {
  id: string;
  symbol: string;
  name: string;
  price_change_percentage_24h: number;
  current_price: number;
}

export const losersService = {
  async fetchTopLosers(): Promise<CoinGeckoMarketData[]> {
    try {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=price_change_percentage_24h_asc&per_page=8"
      );

      if (!response.ok) throw new Error("Falha ao buscar top losers");

      const data = (await response.json()) as CoinGeckoMarketData[];
      return data;
    } catch (error) {
      console.error("Erro no losersService:", error);
      throw new Error("Erro interno");
    }
  },
};
