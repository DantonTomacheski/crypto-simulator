"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const marketService_1 = require("../services/marketService");
const marketController = {
    getMarketData: async (req, res, next) => {
        try {
            const data = await marketService_1.marketService.fetchMarketData();
            res.json(data);
        }
        catch (error) {
            res.status(500).json({ error: "Erro ao obter dados do mercado" });
        }
    },
};
exports.default = marketController;
