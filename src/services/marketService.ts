import fetch from "node-fetch";
import { COINMARKETCAP_API_KEY } from "../config/env";

const BASE_URL =
  "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest";

export const marketService = {
  async fetchMarketData() {
    try {
      const response = await fetch(BASE_URL, {
        method: "GET",
        headers: {
          "X-CMC_PRO_API_KEY": COINMARKETCAP_API_KEY,
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Erro na API CoinMarketCap: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Erro ao buscar dados do mercado:", error);
      throw error;
    }
  },
};
