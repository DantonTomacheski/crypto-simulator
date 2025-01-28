"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.marketService = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
const env_1 = require("../config/env");
const BASE_URL = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest";
exports.marketService = {
    async fetchMarketData() {
        try {
            const response = await (0, node_fetch_1.default)(BASE_URL, {
                method: "GET",
                headers: {
                    "X-CMC_PRO_API_KEY": env_1.COINMARKETCAP_API_KEY,
                    Accept: "application/json",
                },
            });
            if (!response.ok) {
                throw new Error(`Erro na API CoinMarketCap: ${response.status}`);
            }
            const data = await response.json();
            return data;
        }
        catch (error) {
            console.error("Erro ao buscar dados do mercado:", error);
            throw error;
        }
    },
};
