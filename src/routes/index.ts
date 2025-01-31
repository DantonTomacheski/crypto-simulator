import { Router } from "express";

import portfolioController from "../controllers/portfolioController";
import authController from "../controllers/authController";
import { authMiddleware } from "../middleware/auth";
import { loginLimiter } from "../middleware/loginLimiter";
import { trendingController } from "../controllers/trendingController";
import { TopGainersLosersController } from "../controllers/topGainersLosersController";

const router = Router();

// Rotas de autenticação
router.post("/login", loginLimiter, authController.login);
router.post("/register", authController.register);

// Rotas de mercado (públicas)
router.get("/trending", trendingController.getTrending);
router.get(
  "/top_gainers_losers",
  TopGainersLosersController.getTopGainersAndLosers
);

// Rotas de portfólio (protegidas)
router.post("/portfolio", authMiddleware, portfolioController.addToPortfolio);
router.get("/portfolio", authMiddleware, portfolioController.getPortfolio);

export default router;
