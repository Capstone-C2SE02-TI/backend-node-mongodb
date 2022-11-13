const database = require("../../configs/connectDatabase");
const firebase = require("firebase-admin");
const { checkExistedUserId, checkExistedSharkId } = require("./user");
const { UserModel, AdminModel } = require("../../models");

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
	let check = false;
	const users = await database.collection("users").get();

	users.forEach((doc) => {
		if (doc.get("username") == username && doc.get("userId") != userId) {
			check = true;
			return;
		}
	});

	return check;
};

const checkExistedEmailForUpdateProfile = async (userId, email) => {
	let check = false;
	const users = await database.collection("users").get();

	users.forEach((doc) => {
		if (doc.get("email") == email && doc.get("userId") != userId) {
			check = true;
			return;
		}
	});

	return check;
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

		console.log(await checkExistedUsername("levanthuan"));
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

		const users = await database
			.collection("users")
			.where("userId", "==", userId)
			.get();

		users.forEach((doc) => {
			doc.ref.update({ premiumAccount: true });
		});

		return "success";
	} catch (error) {
		return "error";
	}
};

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
	let password;

	const admins = await database
		.collection("admins")
		.where("username", "==", username)
		.get();

	admins.forEach((doc) => {
		password = doc.get("password");
	});

	return password;
};

const getAdminByUsername = async (username) => {
	let user;

	const admins = await database
		.collection("admins")
		.where("username", "==", username)
		.get();

	admins.forEach((doc) => {
		user = doc.data();
	});

	return user;
};

const deleteUserById = async (userId) => {
	let rawDataUser = await database
		.collection("users")
		.where("id", "==", userId)
		.get();

	let isDeleted = false;

	rawDataUser.forEach((doc) => {
		isDeleted = true;
		doc.ref.delete();
	});

	return isDeleted;
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
	deleteUserById,
};
