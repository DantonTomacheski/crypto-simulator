import { Router } from "express";
import marketController from "../controllers/market";
import portfolioController from "../controllers/portfolio";
import authController from "../controllers/auth";
import { authMiddleware } from "../middleware/auth";
import { loginLimiter } from "../controllers/authController";

const router = Router();

// Rotas de autenticação
router.post("/login", loginLimiter, authController.login);
router.post("/register", authController.register);

// Rotas de mercado (públicas)
router.get("/market", marketController.getMarketData);

// Rotas de portfólio (protegidas)
router.post("/portfolio", authMiddleware, portfolioController.addToPortfolio);
router.get("/portfolio", authMiddleware, portfolioController.getPortfolio);

export default router;
