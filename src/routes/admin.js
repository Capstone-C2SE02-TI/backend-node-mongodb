const express = require("express");
const router = express.Router();
const AdminController = require("../controllers/Admin");
const { isAdmin } = require("../middlewares/authentication");

router.post("/signin", AdminController.signin);
router.post("/signout", AdminController.signout);

router.get("/list", isAdmin, AdminController.getAdminsList);
router.post("/delete-users", isAdmin, AdminController.deleteUsers);
router.get("/user/list", isAdmin, AdminController.getUsersList);
router.get("/user/details", isAdmin, AdminController.getUserDetail);

module.exports = router;
