import { Router } from "express";

import portfolioController from "../controllers/portfolioController";
import authController from "../controllers/authController";
import { authMiddleware } from "../middleware/auth";
import { loginLimiter } from "../middleware/loginLimiter";
import { trendingController } from "../controllers/trendingController";
import gainersController from "../controllers/gainersController";
import losersController from "../controllers/losersController";

const router = Router();

// Rotas de autenticação
router.post("/login", loginLimiter, authController.login);
router.post("/register", authController.register);

// Rotas de mercado (públicas)
router.get("/trending", trendingController.getTrending);
router.get("/gainers", gainersController.getTopGainers);
router.get("/losers", losersController.getTopLosers);

// Rotas de portfólio (protegidas)
router.post("/portfolio", authMiddleware, portfolioController.addToPortfolio);
router.get("/portfolio", authMiddleware, portfolioController.getPortfolio);

export default router;
