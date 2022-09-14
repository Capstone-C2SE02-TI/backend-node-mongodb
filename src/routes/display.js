const express = require("express");
const router = express.Router();
const displayController = require("../controllers/Display");

/**
 * @swagger
 * tags:
 *   name: Display
 */

/**
 * @swagger
 * /display/coins:
 *   get:
 *     description: Get list of coins
 *     tags: [Display]
 *     responses:
 *       200:
 *         description: Get list of coins successfully
 *       401:
 *         description: Get list of coins failed
 *       400:
 *         description: Bad request
 */
router.get("/coins", displayController.getCoins);

module.exports = router;
