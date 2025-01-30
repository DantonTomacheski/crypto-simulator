import { Router } from "express";

import portfolioController from "../controllers/portfolioController";
import authController from "../controllers/authController";
import { authMiddleware } from "../middleware/auth";
import { loginLimiter } from "../middleware/loginLimiter";
import { trendingController } from "../controllers/trendingController";
import { MarketCapController } from "../controllers/MarketCapController";

const router = Router();

// Rotas de autenticação
router.post("/login", loginLimiter, authController.login);
router.post("/register", authController.register);

// Rotas de mercado (públicas)
router.get("/trending", trendingController.getTrending);
router.get("/top-marketcap", MarketCapController.getTopMarketCap);
router.get("/low-marketcap", MarketCapController.getLowMarketCap);

// Rotas de portfólio (protegidas)
router.post("/portfolio", authMiddleware, portfolioController.addToPortfolio);
router.get("/portfolio", authMiddleware, portfolioController.getPortfolio);

export default router;
