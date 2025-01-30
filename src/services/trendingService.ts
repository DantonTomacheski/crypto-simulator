import fetch from "node-fetch";

// Interface para a resposta da API CoinGecko
interface GeckoTrendingResponse {
  coins: Array<{
    item: {
      id: string;
      name: string;
      symbol: string;
      market_cap_rank: number;
      price_btc: number;
    };
  }>;
}

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
      return data.coins;
    } catch (error) {
      console.error("Erro ao buscar dados do CoinGecko:", error);
      throw new Error("Falha ao obter trending coins");
    }
  },
};
