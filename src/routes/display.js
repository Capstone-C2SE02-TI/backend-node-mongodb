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
 * /display/tokens:
 *   get:
 *     description: Get list of tokens
 *     tags: [Display]
 *     parameters:
 *      - in: query
 *        name: page
 *        schema:
 *          type: integer
 *     responses:
 *       200:
 *         description: Get list of tokens successfully
 *       401:
 *         description: Get list of tokens failed
 *       400:
 *         description: Bad request
 */
router.get("/tokens", displayController.getTokens);


/**
 * @swagger
 * /display/coins:
 *   get:
 *     description: Get list of coins
 *     tags: [Display]
 *     parameters:
 *      - in: query
 *        name: page
 *        schema:
 *          type: integer
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
