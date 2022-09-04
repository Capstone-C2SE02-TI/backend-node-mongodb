const express = require("express");
const router = express.Router();
const authController = require("../app/controllers/AuthController");

/**
 * @swagger
 * tags:
 *   name: Authentication
 */

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     description: Sign Up
 *     tags: [Authentication]
 *     parameters:
 *      - name: username
 *        in: formData
 *        required: true
 *        type: string
 *      - name: email
 *        in: formData
 *        required: true
 *        type: string
 *      - name: password
 *        in: formData
 *        required: true
 *        type: string
 *      - name: password confirm
 *        in: formData
 *        required: true
 *        type: string
 *     responses:
 *       201:
 *         description: Sign up successfully
 */
router.post("/signup/", authController.signup);

/**
 * @swagger
 * /auth/signin:
 *   post:
 *     description: Sign In
 *     tags: [Authentication]
 *     parameters:
 *      - name: username
 *        in: formData
 *        required: true
 *        type: string
 *      - name: password
 *        in: formData
 *        required: true
 *        type: string
 *     responses:
 *       201:
 *         description: Sign up successfully
 */
router.post("/signin/", authController.signin);

module.exports = router;
