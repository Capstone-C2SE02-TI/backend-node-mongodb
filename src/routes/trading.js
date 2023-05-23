import express from "express";
const router = express.Router();
import TradingController from "../controllers/Trading.js";


router.post("/auto", TradingController.saveAutoTrading);

router.post("/list", TradingController.getListTradingUser);

router.delete("/delete-trade", TradingController.deleteTrade);

export default router;
