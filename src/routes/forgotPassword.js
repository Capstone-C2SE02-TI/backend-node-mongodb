import express from "express";
const router = express.Router();
import ForgotPasswordController from "../controllers/ForgotPassword.js";

router.post("/submit-email", ForgotPasswordController.submitEmail);
router.post("/submit-code", ForgotPasswordController.submitCode);
router.post("/resend-code", ForgotPasswordController.submitEmail);
router.post("/create-new-password", ForgotPasswordController.createNewPassword);

export default router;
