const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/Auth");

router.post("/signup", AuthController.signup);
router.post("/signin", AuthController.signin);
router.post("/signout", AuthController.signout);

export default router;
