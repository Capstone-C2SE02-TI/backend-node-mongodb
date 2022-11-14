const database = require("../../configs/connectDatabase");
const { UserModel, AdminModel } = require("../../models");
const {
	checkExistedUserId,
	checkExistedSharkId,
	checkExistedEmail,
} = require("./user");

const getListOfUsers = async () => {
	const users = await UserModel.find({})
		.sort("id")
		.select(
			"userId username email phoneNumber fullName avatar website sharksFollowed updatedDate createdDate -_id",
		);

	return users;
};

const getUserProfile = async (userId) => {
	if (!userId) return {};
	else {
		const user = await UserModel.findOne({ userId: userId }).select(
			"userId username email phoneNumber fullName avatar website sharksFollowed updatedDate createdDate -_id",
		);

		if (!user) return {};
		else return user;
	}
};

const checkExistedUsernameForUpdateProfile = async (userId, username) => {
	const user = await UserModel.findOne({ username: username });

	if (user && user.userId !== userId) return true;
	else return false;
};

const checkExistedEmailForUpdateProfile = async (userId, email) => {
	const user = await UserModel.findOne({ email: email });

	if (user && user.userId !== userId) return true;
	else return false;
};

const updateUserProfile = async (userId, updateInfo) => {
	try {
		// if (!userId) return "userid-required";
		// else {
		// 	const { email } = updateInfo;

		// 	if (!(await checkExistedUserId(userId))) return "user-notfound";

		// 	if (
		// 		email &&
		// 		(await checkExistedEmailForUpdateProfile(userId, email))
		// 	)
		// 		return "email-existed";

		// 	await UserModel.findOneAndUpdate({ userId: userId }, updateInfo)
		// 		.then((data) => {
		// 			if (!data) throw new Error();
		// 		})
		// 		.catch((error) => {
		// 			throw new Error(error);
		// 		});

		// 	return "success";
		// }

		console.log(
			await checkExistedEmailForUpdateProfile(
				42,
				"levanthuan7@gmail.com",
			),
		);
		return "success";
	} catch (error) {
		return "error";
	}
};

const upgradeUserPremiumAccount = async (userId) => {
	try {
		if (userId === null) return "userid-required";

		if (userId === undefined) return "userid-invalid";

		if (!(await checkExistedUserId(userId))) return "user-notfound";

		await UserModel.findOneAndUpdate(
			{ userId: userId },
			{ premiumAccount: true },
		)
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

// TODO
const followWalletOfShark = async (userId, sharkId) => {
	try {
		if (userId === null) return "userid-required";
		if (userId === undefined) return "userid-invalid";

		if (sharkId === null) return "sharkid-required";
		if (sharkId === undefined) return "sharkid-invalid";

		if (!(await checkExistedUserId(userId))) return "user-notfound";
		if (!(await checkExistedSharkId(sharkId))) return "shark-notfound";

		const users = await database
			.collection("users")
			.where("userId", "==", userId)
			.get();

		const sharks = await database
			.collection("sharks")
			.where("id", "==", sharkId)
			.get();

		let sharkInfo = {};
		sharks.forEach((doc) => {
			const data = doc.data();

			sharkInfo = {
				id: data.id,
				walletAddress: data.walletAddress,
				totalAssets: data.totalAssets,
				percent24h: data.percent24h,
			};
		});

		users.forEach((doc) => {
			doc.ref.update({
				sharksFollowed: [...doc.data().sharksFollowed, sharkInfo],
			});
		});

		return "success";
	} catch (error) {
		return "error";
	}
};

const checkExistedUsername = async (username) => {
	const isExisted = await AdminModel.exists({ username: username });
	return Boolean(isExisted);
};

const getPasswordByUsername = async (username) => {
	const admin = await AdminModel.findOne({ username: username }).select(
		"password -_id",
	);
	return admin?.password || null;
};

const getAdminByUsername = async (username) => {
	const admin = await AdminModel.findOne({ username: username });
	return admin;
};

const deleteUserByUserId = async (userId) => {
	try {
		const deletedObj = await UserModel.deleteOne({ userId: userId });
		return deletedObj.deletedCount === 1;
	} catch (error) {
		return false;
	}
};

module.exports = {
	getListOfUsers,
	getUserProfile,
	checkExistedUsername,
	checkExistedUsernameForUpdateProfile,
	checkExistedEmailForUpdateProfile,
	updateUserProfile,
	upgradeUserPremiumAccount,
	followWalletOfShark,
	getPasswordByUsername,
	getAdminByUsername,
	deleteUserByUserId,
};
