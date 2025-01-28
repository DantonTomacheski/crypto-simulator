"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const market_1 = __importDefault(require("../controllers/market"));
const portfolio_1 = __importDefault(require("../controllers/portfolio"));
const auth_1 = __importDefault(require("../controllers/auth"));
const auth_2 = require("../middleware/auth");
const authController_1 = require("../controllers/authController");
const router = (0, express_1.Router)();
// Rotas de autenticação
router.post("/login", authController_1.loginLimiter, auth_1.default.login);
router.post("/register", auth_1.default.register);
// Rotas de mercado (públicas)
router.get("/market", market_1.default.getMarketData);
// Rotas de portfólio (protegidas)
router.post("/portfolio", auth_2.authMiddleware, portfolio_1.default.addToPortfolio);
router.get("/portfolio", auth_2.authMiddleware, portfolio_1.default.getPortfolio);
exports.default = router;
