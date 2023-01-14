const express = require("express");
const router = express.Router();
const UserController = require("../controllers/User");
const { isAuth } = require("../middlewares/authentication");

router.post("/profile/update", isAuth, UserController.updateUserProfile);
router.get("/profile", isAuth, UserController.getUserProfile);
router.post("/change-password", isAuth, UserController.changePassword);
router.post(
	"/upgrade-premium-account",
	isAuth,
	UserController.upgradePremiumAccount
);

router.post("/follow-shark-wallet", isAuth, UserController.followSharkWallet);
router.post(
	"/unfollow-shark-wallet",
	isAuth,
	UserController.unfollowSharkWallet
);
router.get("/list-followed-shark", isAuth, UserController.getSharkFollowed);

router.post("/add-new-shark", UserController.addNewShark);
router.delete("/delete-shark-not-found", UserController.deleteSharkNotFound);

module.exports = router;
