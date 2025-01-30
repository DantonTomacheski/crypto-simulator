interface Sparkline {
  price: number[];
}

export interface CoinData {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_percentage_24h: number | null;
  image: string;
  current_price_formatted: string;
  change24h: string;
  sparkline_in_7d?: Sparkline;
}

export interface Data {
  source: string;
  data: CoinData[];
}
