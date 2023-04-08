import { UserModel } from "../../models/index.js";
import { checkExistedWalletAddress } from "./user.js";

export const getListOfUsers = async () => {
	const projection = {
		fullName: 1,
		avatar: 1,
		website: 1,
		premiumAccount: 1,
		sharksFollowed: 1,
		addedSharks: 1,
		createdAt: 1
	};

	return await UserModel.find({}, projection).sort("id").lean();
};

export const getUserProfile = async (walletAddress) => {
	if (walletAddress) {

		const projection = {
			fullName: 1,
			avatar: 1,
			website: 1,
			premiumAccount: 1,
			sharksFollowed: 1,
			addedSharks: 1,
			createdAt: 1
		};
		const user = await UserModel.findOne(
			{ walletAddress: walletAddress },
			projection
		).lean();

		if (!user) return {};
		else return user;
	}
	return {};
};

export const checkExistedEmailForUpdateProfile = async (userId, email) => {
	const user = await UserModel.findOne({ email: email }).lean();

	if (user && user.userId !== userId) return true;
	else return false;
};

export const updateUserProfile = async (walletAddress, updateInfo) => {
	try {
		if (!walletAddress) return "wallet-address-required";
		else {
			const { fullName, email, phoneNumber, website, avatar } = updateInfo;

			if (!(await checkExistedWalletAddress(walletAddress)))
				return "user-notfound";

			const newUpdateInfo = {
				fullName: fullName === "" ? undefined : fullName,
				email: email === "" ? undefined : email,
				phoneNumber: phoneNumber === "" ? undefined : phoneNumber,
				website: website === "" ? undefined : website,
				avatar: avatar === "" ? undefined : avatar
			};


			await UserModel.findOneAndUpdate(
				{ walletAddress: walletAddress },
				newUpdateInfo
			)
				.lean()
				.then((data) => {
					if (!data) throw new Error();
				})
				.catch((error) => {
					throw new Error(error);
				});

			return "success";
		}
	} catch (error) {
		return "error";
	}
};

export const upgradeUserPremiumAccount = async (walletAddress) => {
	try {
		if (walletAddress === null) return "wallet-address-required";
		if (walletAddress === undefined) return "wallet-address-invalid";
		if (!(await checkExistedWalletAddress(walletAddress)))
			return "user-notfound";

		await UserModel.findOneAndUpdate(
			{ walletAddress: walletAddress },
			{ premiumAccount: true }
		)
			.lean()
			.then((data) => {
				if (!data) throw new Error();
			})
			.catch((error) => {
				throw new Error(error);
			});

		return "success";
	} catch (error) {
		return "error";
	}
};

export const getAdminByUsername = async (username) => {
	return await AdminModel.findOne({ username: username }).lean();
};

export const deleteUsersByUserId = async (userIds) => {
	try {
		const deletedObj = await UserModel.remove({
			userId: { $in: userIds }
		}).lean();

		return deletedObj.deletedCount > 0;
	} catch (error) {
		return false;
	}
};
