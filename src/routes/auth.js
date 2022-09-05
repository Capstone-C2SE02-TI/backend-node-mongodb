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
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - phoneNumber
 *               - password
 *             properties:
 *               username:
 *                  type: string
 *               email:
 *                  type: string
 *               phoneNumber:
 *                  type: string
 *               password:
 *                  type: string
 *             example:
 *               username: "hieuhn"
 *               email: "hieuhn@gmail.com"
 *               phoneNumber: "0366871673"
 *               password: "12345678"
 *     responses:
 *       200:
 *         description: Sign up successfully
 *       401:
 *         description: Sign up failed
 *       400:
 *         description: Bad Request
 */
router.post("/signup", authController.signup);

/**
 * @swagger
 * /auth/signin:
 *   post:
 *     description: Sign In
 *     tags: [Authentication]
 *     parameters:
 *      - name: username
 *        in: body
 *        required: true
 *        type: string
 *      - name: password
 *        in: body
 *        required: true
 *        type: string
 *     responses:
 *       200:
 *         description: Sign in successfully
 *       400:
 *         description: Sign in failed
 */
router.post("/signin", authController.signin);

module.exports = router;
