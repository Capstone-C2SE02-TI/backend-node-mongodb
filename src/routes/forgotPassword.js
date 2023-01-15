const express = require("express");
const router = express.Router();
const ForgotPasswordController = require("../controllers/ForgotPassword");

router.post("/submit-email", ForgotPasswordController.submitEmail);
router.post("/submit-code", ForgotPasswordController.submitCode);
router.post("/resend-code", ForgotPasswordController.submitEmail);
router.post("/create-new-password", ForgotPasswordController.createNewPassword);

module.exports = router;
