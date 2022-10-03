const express = require("express");
const router = express.Router();
const { getList } = require("../controllers/Test");

/**
 * @swagger
 * tags:
 *   name: Sites
 */

/**
 * @swagger
 * /list:
 *   get:
 *     description: Test
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Test successfully
 *       401:
 *         description: Test failed
 *       400:
 *         description: Bad request
 */
router.get("/list", getList);

module.exports = router;
