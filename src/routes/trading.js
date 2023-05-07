import express from "express";
const router = express.Router();
import TradingController from "../controllers/Trading.js";


router.post("/auto", TradingController.saveAutoTrading);

export default router;
