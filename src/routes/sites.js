const express = require("express");
const router = express.Router();
const sitesController = require("../app/controllers/SitesController");

/**
 * @swagger
 * tags:
 *   name: Sites
 */

/**
 * @swagger
 * /forgot-password:
 *   post:
 *     description: Forgot Password
 *     tags: [Sites]
 *     parameters:
 *      - name: email
 *        in: formData
 *        required: true
 *        type: string
 *     responses:
 *       200:
 *         description: Success
 *
 */
router.post("/forgot-password", sitesController.forgotPassword);

module.exports = router;
