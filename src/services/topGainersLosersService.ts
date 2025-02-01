import puppeteer from "puppeteer";
import { CoinData } from "../types/coin.types";

interface ScrapedCoinData {
  rank: string;
  name: string;
  symbol: string;
  price: string;
  change: string;
  image: string;
}

function parsePrice(priceStr: string): number {
  const cleaned = priceStr.replace("$", "").replace(/,/g, "").trim();
  return parseFloat(cleaned);
}

function parsePercentage(changeStr: string): number {
  const cleaned = changeStr.replace("%", "").trim();
  return parseFloat(cleaned);
}

function mapScrapedToCoinData(scraped: ScrapedCoinData): CoinData {
  const current_price = parsePrice(scraped.price);
  return {
    id: scraped.symbol.toLowerCase(),
    symbol: scraped.symbol,
    name: scraped.name,
    current_price,
    current_price_formatted: scraped.price,
    price_change_percentage_24h: parsePercentage(scraped.change),
    image: scraped.image,
    sparkline_in_7d: undefined,
  };
}

export const topGainersLosersService = {
  async fetchTopGainersAndLosers(): Promise<{
    gainers: CoinData[];
    losers: CoinData[];
  }> {
    const url = "https://coinmarketcap.com/gainers-losers/";
    console.log(`Buscando dados em ${url}`);
    const browser = await puppeteer.launch({
      args: ["--no-sandbox"],
      headless: true,
    });
    try {
      const page = await browser.newPage();
      await page.goto(url, { waitUntil: "networkidle2" });
      await page.waitForSelector(".table-wrap", { timeout: 15000 });

      const result = await page.evaluate(() => {
        interface ScrapedCoinData {
          rank: string;
          name: string;
          symbol: string;
          price: string;
          change: string;
          image: string;
        }

        const parseRows = (container: Element): ScrapedCoinData[] => {
          const rows: ScrapedCoinData[] = [];
          const tableRows = container.querySelectorAll("table tbody tr");
          tableRows.forEach((row) => {
            const tds = row.querySelectorAll("td");
            if (tds.length < 5) return;
            const rank = tds[0]?.textContent?.trim() || "";
            const name = tds[1]?.querySelector("p")?.textContent?.trim() || "";
            const symbol =
              tds[1]?.querySelector(".coin-item-symbol")?.textContent?.trim() ||
              "";
            const image =
              tds[1]?.querySelector("img.coin-logo")?.getAttribute("src") || "";
            const price = tds[2]?.textContent?.trim() || "";
            const change = tds[3]?.textContent?.trim() || "";
            rows.push({ rank, name, symbol, price, change, image });
          });
          return rows;
        };

        const gainers: ScrapedCoinData[] = [];
        const losers: ScrapedCoinData[] = [];

        // Seleciona as colunas individuais dentro do container "table-wrap"
        const columns = document.querySelectorAll(
          ".table-wrap .uikit-col-md-8"
        );
        columns.forEach((col) => {
          const header =
            col.querySelector("h3")?.textContent?.trim().toLowerCase() || "";
          if (header.includes("gainers")) {
            gainers.push(...parseRows(col));
          } else if (header.includes("losers")) {
            losers.push(...parseRows(col));
          }
        });
        return { gainers, losers };
      });

      const gainers: CoinData[] = result.gainers.map(
        (scraped: ScrapedCoinData) => mapScrapedToCoinData(scraped)
      );
      const losers: CoinData[] = result.losers.map((scraped: ScrapedCoinData) =>
        mapScrapedToCoinData(scraped)
      );

      console.log("Extração concluída:", {
        gainers: gainers.length,
        losers: losers.length,
      });
      return { gainers, losers };
    } catch (error) {
      console.error(
        "Erro na função fetchTopGainersAndLosers com Puppeteer:",
        error
      );
      throw error;
    } finally {
      await browser.close();
    }
  },
};
