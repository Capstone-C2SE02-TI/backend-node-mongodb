const express = require("express");
const router = express.Router();
const DisplayController = require("../controllers/Display");

/* Coins And Tokens */
router.get(
	"/coins-and-tokens/reducing",
	DisplayController.getReducingCoinsAndTokens
);
router.get("/coins-and-tokens/all", DisplayController.getCoinsAndTokens);
router.get("/coins/trending", DisplayController.getTrendingCoins);
router.get("/tokens/trending", DisplayController.getTrendingTokens);
router.get("/coin/details", DisplayController.getCoinOrTokenDetails);

/* Sharks */
router.get("/sharks", DisplayController.getSharks);
router.post(
	"/sharks/transaction-history/page-length",
	DisplayController.getTransactionsLengthForPage
);
router.post(
	"/sharks/transaction-history",
	DisplayController.getListTransactionsOfAllSharks
);
router.get("/shark/crypto", DisplayController.getCryptosOfShark);
router.get(
	"/shark/transaction-history",
	DisplayController.getTransactionsOfShark
);
router.get(
	"/shark/trade-transaction-history",
	DisplayController.getTradeTransactionHistory
);
router.get("/sharks/length", DisplayController.getLengthOfSharksList);
router.get(
	"/sharks/transaction-history/length",
	DisplayController.getLengthOfTransactionsList
);

/* Gain And Loss */
router.get("/sharks/gain-loss", DisplayController.getGainLossOfSharks);
router.get("/coins/gain-loss", DisplayController.getGainLossOfCoins);

/* User */
router.get("/users/length", DisplayController.getLengthOfUsersList);

/* Others */
router.get("/tags", DisplayController.getTags);

module.exports = router;
