import PortfolioController from "../controllers/Portfolio.js";
import express from "express";
const router = express.Router();

router.get("/:walletAddress", PortfolioController.getPortfolio);

export default router;
