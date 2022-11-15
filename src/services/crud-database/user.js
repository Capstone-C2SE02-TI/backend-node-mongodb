const mongoose = require("mongoose");
const { Types } = mongoose;

const {
	UserModel,
	TokenModel,
	SharkModel,
	TagModel,
	TransactionModel,
} = require("../../models");
const {
	DEFAULT_USER_FULLNAME,
	DEFAULT_USER_AVATAR,
	DEFAULT_USER_WEBSITE,
	QUERY_LIMIT_ITEM,
	TRENDING_REDUCING_LIMIT_ITEM,
} = require("../../constants");

const getUserByUsername = async (username) => {
	return await UserModel.findOne({ username: username });
};

const getUserByEmail = async (email) => {
	return await UserModel.findOne({ email: email });
};

const getUsersLength = async () => {
	return await UserModel.count({});
};

const createNewUser = async ({
	username,
	email,
	phoneNumber,
	hashPassword,
}) => {
	try {
		const usersLength = await getUsersLength();
		const id = usersLength ? usersLength + 1 : 1;

		const newUserInfo = {
			_id: new Types.ObjectId(),
			id: id,
			userId: id,
			username: username,
			email: email,
			phoneNumber: phoneNumber,
			password: hashPassword,
			fullName: DEFAULT_USER_FULLNAME,
			avatar: DEFAULT_USER_AVATAR,
			website: DEFAULT_USER_WEBSITE,
			premiumAccount: false,
			sharkFollowed: [],
			createdDate: new Date(),
			updatedDate: new Date(),
		};

		await UserModel.create(newUserInfo)
			.then((data) => {})
			.catch((error) => {
				throw new Error(error);
			});

		return true;
	} catch (error) {
		return false;
	}
};

const updateUserConfirmationCode = async (userId, code) => {
	try {
		await UserModel.findOneAndUpdate(
			{ userId: userId },
			{ confirmationCode: code },
		)
			.then((data) => {
				if (!data) throw new Error();
			})
			.catch((error) => {
				throw new Error(error);
			});

		return true;
	} catch (error) {
		return false;
	}
};

const updateUserPassword = async (userId, password) => {
	try {
		await UserModel.findOneAndUpdate(
			{ userId: userId },
			{ password: password },
		)
			.then((data) => {
				if (!data) throw new Error();
			})
			.catch((error) => {
				throw new Error(error);
			});

		return true;
	} catch (error) {
		return false;
	}
};

const checkExistedUsername = async (username) => {
	const isExisted = await UserModel.exists({ username: username });
	return Boolean(isExisted);
};

const checkExistedEmail = async (email) => {
	const isExisted = await UserModel.exists({ email: email });
	return Boolean(isExisted);
};

const checkExistedUserId = async (userId) => {
	const isExisted = await UserModel.exists({ userId: userId });
	return Boolean(isExisted);
};

const checkExistedSharkId = async (sharkId) => {
	const isExisted = await SharkModel.exists({ id: sharkId });
	return Boolean(isExisted);
};

const getPasswordByUsername = async (username) => {
	const user = await UserModel.findOne({ username: username }).select(
		"password -_id",
	);
	return user?.password || null;
};

const getPasswordByEmail = async (email) => {
	const user = await UserModel.findOne({ email: email }).select(
		"password -_id",
	);
	return user?.password || null;
};

const getListOfCoinsAndTokens = async () => {
	const tokens = await TokenModel.find({})
		.select(
			"id name symbol iconURL tagNames cmcRank usd marketCap circulatingSupply pricesLast1Day -_id",
		)
		.sort("id");

	return tokens || [];
};

const getCoinsAndTokensLength = async () => {
	return await TokenModel.count({});
};

const getListReducingCoinsAndTokens = async () => {
	const reducingTokens = await TokenModel.find({})
		.sort({ "usd.percentChange24h": "asc" })
		.limit(TRENDING_REDUCING_LIMIT_ITEM)
		.select("id name symbol iconURL tagNames usd pricesLast1Day -_id");

	return reducingTokens;
};

const getListTrendingCoins = async () => {
	const trendingCoins = await TokenModel.find({ type: "coin" })
		.sort({ "usd.percentChange24h": "desc" })
		.limit(TRENDING_REDUCING_LIMIT_ITEM)
		.select(
			"id name symbol iconURL tagNames usd marketCap circulatingSupply -_id",
		);

	return trendingCoins;
};

const getListTrendingTokens = async () => {
	const trendingTokens = await TokenModel.find({ type: "token" })
		.sort({ "usd.percentChange24h": "desc" })
		.limit(TRENDING_REDUCING_LIMIT_ITEM)
		.select(
			"id name symbol iconURL tagNames usd marketCap circulatingSupply -_id",
		);

	return trendingTokens;
};

const getCoinOrTokenDetails = async (coinSymbol) => {
	const coinOrToken = await TokenModel.findOne({
		symbol: coinSymbol.toUpperCase(),
	}).select(
		"id ethId name type symbol iconURL cmcRank tagNames maxSupply totalSupply circulatingSupply contractAddress marketCap urls usd prices -_id",
	);

	return coinOrToken || {};
};

const getListOfTags = async () => {
	return await TagModel.find({}).sort("id").select("id name -_id");
};

const getSharksLength = async () => {
	return await SharkModel.count({});
};

const getListOfSharks = async () => {
	const sharks = await SharkModel.find({})
		.sort("id")
		.select("id walletAddress totalAssets percent24h -_id");

	return sharks;
};

const getListCryptosOfShark = async (sharkId) => {
	const shark = await SharkModel.findOne({ id: sharkId }).select(
		"cryptos -_id",
	);
	return shark?.cryptos || -1;
};

const getTransactionsLength = async () => {
	return await TransactionModel.count({});
};

const getTransactionsOfAllSharks = async (page) => {
	if (page < 1 || page % 1 !== 0) return [];

	const transactions = await TransactionModel.find({})
		.select("-_id")
		.sort({ timeStamp: "desc" })
		.skip((page - 1) * QUERY_LIMIT_ITEM)
		.limit(QUERY_LIMIT_ITEM);

	return transactions || [];
};

const getListTransactionsOfShark = async (sharkId) => {
	const shark = await SharkModel.findOne({ id: sharkId }).select(
		"transactionsHistory -_id",
	);
	return shark?.transactionsHistory || -1;
};

const getTradeTransactionHistoryOfShark = async (sharkId, coinSymbol) => {
	try {
		// if (sharkId === null) return { message: "sharkid-required" };

		// if (sharkId === undefined) return { message: "sharkid-invalid" };

		// if (!coinSymbol) return { message: "coinsymbol-required" };

		// if (!(await checkExistedSharkId(sharkId)))
		// 	return { message: "shark-notfound" };

		// const sharks = await SharkModel.findOne({ id: sharkId }).select(
		// 	"historyDatas -_id",
		// );

		// const historyData = sharks.historyDatas.find(
		// 	(data) => data.coinSymbol === coinSymbol.toUpperCase(),
		// );

		// if (!historyData) return { message: "coin-notfound" };
		// else {
		// 	const coinInfo = await TokenModel.findOne({
		// 		symbol: coinSymbol.toUpperCase(),
		// 	}).select(
		// 		"ethId name symbol iconURL cmcRank maxSupply totalSupply circulatingSupply marketCap contractAddress prices -_id",
		// 	);

		// 	return {
		// 		message: "success",
		// 		data: {
		// 			historyData: historyData.historyData || [],
		// 			coinInfo: coinInfo || null,
		// 		},
		// 	};
		// }

		
	} catch (error) {
		return { message: "error" };
	}
};

const getHoursPriceOfToken = async (tokenSymbol) => {
	const token = await TokenModel.findOne({
		symbol: tokenSymbol.toUpperCase(),
	}).select("originalPrices -_id");

	return token?.originalPrices?.hourly || {};
};

module.exports = {
	getUserByUsername,
	getUserByEmail,
	getUsersLength,
	createNewUser,
	updateUserConfirmationCode,
	updateUserPassword,
	checkExistedUsername,
	checkExistedEmail,
	checkExistedUserId,
	checkExistedSharkId,
	getPasswordByUsername,
	getPasswordByEmail,
	getListOfCoinsAndTokens,
	getCoinsAndTokensLength,
	getCoinOrTokenDetails,
	getListOfSharks,
	getSharksLength,
	getListOfTags,
	getListReducingCoinsAndTokens,
	getListTrendingCoins,
	getListTrendingTokens,
	getListCryptosOfShark,
	getTransactionsOfAllSharks,
	getListTransactionsOfShark,
	getTradeTransactionHistoryOfShark,
	getHoursPriceOfToken,
	getTransactionsLength,
};
