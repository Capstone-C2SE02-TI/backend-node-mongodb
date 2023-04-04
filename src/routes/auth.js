import express from "express";
const router = express.Router();
import AuthController from "../controllers/Auth.js";

router.post("/signup", AuthController.signup);

export default router;
