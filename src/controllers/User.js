import _ from "lodash";
import {
	followWalletOfShark,
	unfollowWalletOfShark,
	getListOfSharkFollowed,
	addNewShark,
	deleteSharkNotFound
} from "../services/crudDatabase/user.js";
import {
	getUserProfile,
	updateUserProfile,
	upgradeUserPremiumAccount
} from "../services/crudDatabase/admin.js";
import {
	validateUpdateProfileBody,
} from "../validators/user.js";

function UserController() {
	this.getUserProfile = async (req, res, next) => {
		let walletAddress = req.query.walletAddress;

		if (!walletAddress) walletAddress = null;
		else {
			const walletAddressCheck = _.toString(walletAddress);
			if (_.isNaN(walletAddressCheck)) walletAddress = undefined;
		}
		await getUserProfile(walletAddress)
			.then((data) =>
				Object.entries(data).length === 0
					? res.status(400).json({
							message: "failed-wallet-address-invalid",
							error: "wallet-address-invalid",
							data: data
					  })
					: res.status(200).json({
							message: "successfully",
							error: null,
							data: data
					  })
			)
			.catch((error) =>
				res.status(400).json({
					message: "failed",
					error: error,
					data: {}
				})
			);
	};

	this.updateUserProfile = async (req, res, next) => {
		let walletAddress = req.query.walletAddress;

		if (!walletAddress) walletAddress = null;
		else {
			const walletAddressCheck = _.toString(walletAddress);
			if (_.isNaN(walletAddressCheck)) walletAddress = undefined;
		}

		const { status, error } = await validateUpdateProfileBody(req, res, next);

		if (status === "failed")
			return res.status(400).json({ message: error, error: error });
		else {
			const updateInfo = req.body;
			await updateUserProfile(walletAddress, updateInfo)
				.then((data) =>
					data === "success"
						? res.status(200).json({
								message: "successfully",
								error: null
						  })
						: res.status(400).json({
								message: data,
								error: data
						  })
				)
				.catch((error) =>
					res.status(400).json({
						message: "failed",
						error: error
					})
				);
		}
	};

	this.upgradePremiumAccount = async (req, res, next) => {
		let walletAddress = req.body.walletAddress; 

		if (!walletAddress) walletAddress = null;
		else {
			if (isNaN(walletAddress)) walletAddress = undefined;
		}

		await upgradeUserPremiumAccount(walletAddress)
			.then((data) =>
				data === "success"
					? res.status(200).json({
							message: "successfully",
							error: null
					  })
					: res.status(400).json({
							message: data,
							error: data
					  })
			)
			.catch((error) =>
				res.status(400).json({
					message: "failed",
					error: error
				})
			);
	};

	this.followSharkWallet = async (req, res, next) => {
		let { walletAddress, sharkId } = req.body;

		if (!walletAddress) walletAddress = null;
		else {
			if (isNaN(walletAddress)) walletAddress = undefined;
		}

		if (!sharkId) sharkId = null;
		else {
			if (isNaN(sharkId)) sharkId = undefined;
			else sharkId = Number(sharkId);
		}

		await followWalletOfShark(walletAddress, sharkId)
			.then((data) => {
				if (data.message === "success")
					return res.status(200).json({
						message: "successfully",
						error: null,
						data: data.data
					});
				else
					return res.status(400).json({
						message: data.message,
						error: data.message
					});
			})
			.catch((error) =>
				res.status(400).json({
					message: "failed",
					error: error
				})
			);
	};

	this.unfollowSharkWallet = async (req, res, next) => {
		let { walletAddress, sharkId } = req.body;

		if (!walletAddress) walletAddress = null;
		else {
			if (isNaN(walletAddress)) walletAddress = undefined;
		}

		if (!sharkId) sharkId = null;
		else {
			if (isNaN(sharkId)) sharkId = undefined;
			else sharkId = Number(sharkId);
		}
		await unfollowWalletOfShark(walletAddress, sharkId)
			.then((data) => {
				if (data.message === "success")
					return res.status(200).json({
						message: "successfully",
						error: null,
						data: data.data
					});
				else
					return res.status(400).json({
						message: data.message,
						error: data.error
					});
			})
			.catch((error) =>
				res.status(400).json({
					message: "failed",
					error: error
				})
			);
	};

	this.getSharkFollowed = async (req, res, next) => {
		let walletAddress = req.query.walletAddress;

		if (!walletAddress) walletAddress = null;
		else {
			if (isNaN(walletAddress)) walletAddress = undefined;
		}

		await getListOfSharkFollowed(walletAddress)
			.then((data) => {
				data.message === "success"
					? res.status(200).json({
							message: "successfully",
							error: null,
							datasLength: data.datas.length,
							datas: data.datas
					  })
					: res.status(400).json({
							message: data.message,
							error: data.message,
							datasLength: 0,
							datas: []
					  });
			})
			.catch((error) =>
				res.status(400).json({
					message: "failed",
					error: error,
					datasLength: 0,
					datas: []
				})
			);
	};

	this.addNewShark = async (req, res, next) => {
		let { walletAddress, sharkWalletAddress } = req.body;

		if (!walletAddress) walletAddress = null;
		else {
			if (isNaN(walletAddress)) walletAddress = undefined;
		}

		if (!sharkWalletAddress) sharkWalletAddress = null;
		else {
			if (isNaN(sharkWalletAddress)) sharkWalletAddress = undefined;
		}

		await addNewShark(walletAddress, sharkWalletAddress)
			.then((data) => {
				data.isAdded
					? res.status(200).json({
							message: data.message,
							data: data.data,
							sharkAdded: data.sharkAdded,
							error: null
					  })
					: res.status(400).json({
							message: "add-failed",
							error: data.message
					  });
			})
			.catch((error) =>
				res.status(400).json({
					message: error.message,
					error: error.error
				})
			);
	};

	this.deleteSharkNotFound = async (req, res, next) => {
		let { walletAddress, addedSharkAddress } = req.body;

		if (!walletAddress) walletAddress = null;
		else {
			if (isNaN(walletAddress)) walletAddress = undefined;
		}

		await deleteSharkNotFound(walletAddress, addedSharkAddress)
			.then((data) => {
				data.isDeleted
					? res.status(200).json({
							message: data.message,
							error: null
					  })
					: res.status(400).json({
							message: "deleted-failed",
							error: data.message
					  });
			})
			.catch((error) =>
				res.status(400).json({
					message: error.message,
					error: error.error
				})
			);
	};
}

export default new UserController();
