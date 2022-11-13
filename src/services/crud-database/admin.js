const database = require("../../configs/connectDatabase");
const { UserModel, AdminModel } = require("../../models");
const { checkExistedUserId, checkExistedSharkId } = require("./user");

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

// TODO
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

// TODO
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

		console.log(await getPasswordByUsername("levanthuan"));
		return "success";
	} catch (error) {
		return "error";
	}
};

// TODO
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

// TODO
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
