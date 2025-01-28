"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const portfolioService_1 = require("../services/portfolioService");
const portfolioController = {
    addToPortfolio: async (req, res, next) => {
        try {
            const userId = req.user.userId;
            const { symbol, amount } = req.body;
            const portfolio = await portfolioService_1.portfolioService.addAsset(userId, symbol, amount);
            res.status(201).json({ message: "Ativo adicionado", portfolio });
        }
        catch (error) {
            res.status(500).json({ error: "Erro ao adicionar ativo ao portfólio" });
        }
    },
    getPortfolio: async (req, res, next) => {
        try {
            const userId = req.user.userId;
            const portfolio = await portfolioService_1.portfolioService.getPortfolio(userId);
            res.json(portfolio);
        }
        catch (error) {
            res.status(500).json({ error: "Erro ao obter portfólio" });
        }
    },
};
exports.default = portfolioController;
