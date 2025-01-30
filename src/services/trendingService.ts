import fetch from "node-fetch";
import { GeckoTrendingResponse } from "../types/trending.types";

const BASE_URL = "https://api.coingecko.com/api/v3/search/trending";

export const trendingService = {
  async fetchTrending(): Promise<GeckoTrendingResponse["coins"]> {
    try {
      const response = await fetch(BASE_URL, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        const errorData = (await response.json()) as { error?: string };
        throw new Error(
          `Erro na Gecko API: ${errorData.error || response.status}`
        );
      }

      const data = (await response.json()) as GeckoTrendingResponse;
      return data.coins; // Retorna os dados completos, sem cortar informações
    } catch (error) {
      console.error("Erro ao buscar dados do CoinGecko:", error);
      throw new Error("Falha ao obter trending coins");
    }
  },
};
