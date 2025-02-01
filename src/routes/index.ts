import { Router } from "express";

import portfolioController from "../controllers/portfolioController";
import authController from "../controllers/authController";
import { authMiddleware } from "../middleware/auth";
import { loginLimiter } from "../middleware/loginLimiter";
import { trendingController } from "../controllers/trendingController";
import { TopGainersLosersController } from "../controllers/topGainersLosersController";
import { GlobalMetricsController } from "../controllers/globalMetricsController";
import { ListingsLatestController } from "../controllers/listingsLatestController";

const router = Router();

router.post("/login", loginLimiter, authController.login);
router.post("/register", authController.register);

router.get("/trending", trendingController.getTrending);
router.get(
  "/top_gainers_losers",
  TopGainersLosersController.getTopGainersAndLosers
);
router.get("/global_metrics", GlobalMetricsController.getGlobalMetrics);
router.get("/listings_latest", ListingsLatestController.getListingsLatest);

router.post("/portfolio", authMiddleware, portfolioController.addToPortfolio);
router.get("/portfolio", authMiddleware, portfolioController.getPortfolio);

export default router;
