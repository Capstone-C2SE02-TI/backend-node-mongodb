import { UserModel } from "../../models/index.js";
import { checkExistedUserId } from "./user.js";

export const getListOfUsers = async () => {
	return await UserModel.find({})
		.sort("id")
		.select(
			"userId username email phoneNumber fullName avatar website sharksFollowed updatedAt createdAt -_id"
		)
		.lean();
};

export const getUserProfile = async (userId) => {
	if (!userId) return {};
	else {
		const user = await UserModel.findOne({ userId: userId })
			.select(
				"userId username email phoneNumber fullName avatar website sharksFollowed updatedAt createdAt -_id"
			)
			.lean();

		if (!user) return {};
		else return user;
	}
};

export const checkExistedUsernameForUpdateProfile = async (
	userId,
	username
) => {
	const user = await UserModel.findOne({ username: username }).lean();

	if (user && user.userId !== userId) return true;
	else return false;
};

export const checkExistedEmailForUpdateProfile = async (userId, email) => {
	const user = await UserModel.findOne({ email: email }).lean();

	if (user && user.userId !== userId) return true;
	else return false;
};

export const updateUserProfile = async (userId, updateInfo) => {
	try {
		if (!userId) return "userid-required";
		else {
			const { fullName, email, phoneNumber, website, avatar } = updateInfo;

			if (!(await checkExistedUserId(userId))) return "user-notfound";

			if (email && (await checkExistedEmailForUpdateProfile(userId, email)))
				return "email-existed";

			const newUpdateInfo = {
				fullName: fullName === "" ? undefined : fullName,
				email: email === "" ? undefined : email,
				phoneNumber: phoneNumber === "" ? undefined : phoneNumber,
				website: website === "" ? undefined : website,
				avatar: avatar === "" ? undefined : avatar
			};

			await UserModel.findOneAndUpdate({ userId: userId }, newUpdateInfo)
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

export const upgradeUserPremiumAccount = async (userId) => {
	try {
		if (userId === null) return "userid-required";
		if (userId === undefined) return "userid-invalid";
		if (!(await checkExistedUserId(userId))) return "user-notfound";

		await UserModel.findOneAndUpdate(
			{ userId: userId },
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

export const checkExistedUsername = async (username) => {
	const isExisted = await AdminModel.exists({ username: username }).lean();
	return Boolean(isExisted);
};

export const getPasswordByUsername = async (username) => {
	const admin = await AdminModel.findOne({ username: username })
		.select("password -_id")
		.lean();
	return admin?.password || null;
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
