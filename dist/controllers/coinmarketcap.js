"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/services/coinmarketcap.ts
const node_fetch_1 = __importDefault(require("node-fetch"));
const env_1 = require("../config/env");
const coinMarketCapService = {
    fetchMarketData: async () => {
        const url = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest";
        try {
            const response = await (0, node_fetch_1.default)(url, {
                method: "GET",
                headers: {
                    "X-CMC_PRO_API_KEY": env_1.COINMARKETCAP_API_KEY,
                    Accept: "application/json",
                },
            });
            if (!response.ok) {
                throw new Error(`Erro ao acessar CoinMarketCap: ${response.status}`);
            }
            const data = await response.json();
            return data;
        }
        catch (error) {
            console.error("Erro ao buscar dados da CoinMarketCap:", error);
            throw error;
        }
    },
};
exports.default = coinMarketCapService;
