import fetch from "node-fetch";

export const globalMetricsService = {
  async fetchGlobalMetrics() {
    const url =
      "https://pro-api.coinmarketcap.com/v1/global-metrics/quotes/latest";
    const response = await fetch(url, {
      headers: {
        "X-CMC_PRO_API_KEY": `${process.env.CMC_API_KEY}`,
      },
    });
    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.statusText}`);
    }
    return await response.json();
  },
};
