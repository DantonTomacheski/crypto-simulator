// src/services/coinmarketcap.ts
import fetch from "node-fetch";
import { COINMARKETCAP_API_KEY } from "../config/env";

const coinMarketCapService = {
  fetchMarketData: async () => {
    const url =
      "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest";
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "X-CMC_PRO_API_KEY": COINMARKETCAP_API_KEY,
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Erro ao acessar CoinMarketCap: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Erro ao buscar dados da CoinMarketCap:", error);
      throw error;
    }
  },
};

export default coinMarketCapService;
