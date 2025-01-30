import fetch from "node-fetch";
import { CoinData } from "../types/coin.types";

export const mktCaplosersService = {
  async fetchTopLosers(): Promise<CoinData[]> {
    try {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_asc&per_page=8&page=1&sparkline=true"
      );
      if (!response.ok) throw new Error("Falha ao buscar top losers");

      const data = (await response.json()) as CoinData[];
      return data;
    } catch (error) {
      console.error("Erro no losersService:", error);
      throw new Error("Erro interno");
    }
  },
};
