import express from "express";
const router = express.Router();
import AuthController from "../controllers/Auth.js";

router.post("/signup", AuthController.signup);
router.post("/signin", AuthController.signin);
router.post("/signout", AuthController.signout);

export default router;
