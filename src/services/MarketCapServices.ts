import fetch from "node-fetch";
import { CoinData } from "../types/coin.types";

export const mktCapGainersService = {
  async fetchTopGainers(): Promise<CoinData[]> {
    try {
      const response = await fetch(
        `${process.env.GECKO_COIN_BASE_URL}/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=8&page=1&sparkline=true`
      );

      if (!response.ok) throw new Error("Falha ao buscar top gainers");

      const data = (await response.json()) as CoinData[];
      return data;
    } catch (error) {
      console.error("Erro no gainersService:", error);
      throw new Error("Erro interno");
    }
  },
};

export const mktCaplosersService = {
  async fetchTopLosers(): Promise<CoinData[]> {
    try {
      const response = await fetch(
        `${process.env.GECKO_COIN_BASE_URL}/v3/coins/markets?vs_currency=usd&order=market_cap_asc&per_page=8&page=1&sparkline=true`
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
