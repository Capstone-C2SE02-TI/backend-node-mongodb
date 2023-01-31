import express from "express";
const router = express.Router();
import AdminController from "../controllers/Admin.js";
import { isAdmin } from "../middlewares/authentication/index.js";

router.post("/signin", AdminController.signin);
router.post("/signout", AdminController.signout);

router.get("/list", isAdmin, AdminController.getAdminsList);
router.post("/delete-users", isAdmin, AdminController.deleteUsers);
router.get("/user/list", isAdmin, AdminController.getUsersList);
router.get("/user/details", isAdmin, AdminController.getUserDetail);

export default router;
