import fetch from "node-fetch";

export const listingsLatestService = {
  async fetchListingsLatest() {
    const url =
      "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=1&limit=100&convert=USD";
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
