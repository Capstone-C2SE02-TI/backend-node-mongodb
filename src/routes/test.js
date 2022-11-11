const express = require("express");
const router = express.Router();
const TestController = require("../controllers/Test");

/**
 * @swagger
 * /test:
 *   get:
 *     description: Test
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Test successfully
 *       400:
 *         description: Test failed
 */
router.get("/", TestController.test);

module.exports = router;
