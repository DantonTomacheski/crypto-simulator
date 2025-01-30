export interface GeckoTrendingResponse {
  coins: Array<{
    item: {
      id: string;
      coin_id: number;
      name: string;
      symbol: string;
      market_cap_rank: number;
      thumb: string;
      small: string;
      large: string;
      slug: string;
      price_btc: number;
      score: number;
      data: {
        price: number;
        price_btc: string;
        price_change_percentage_24h: Record<string, number>;
        market_cap: string;
        market_cap_btc: string;
        total_volume: string;
        total_volume_btc: string;
        sparkline: string;
        content: string | null;
      };
    };
  }>;
}

// Tipagem dos dados formatados que a API irá retornar no endpoint
export interface FormattedCoin {
  symbol: string;
  marketCapRank: number;
  priceUSD: number;
  priceChange24h: number;
  sparkline: string;
  smallIcon: string;
  mediumIcon: string;
}
