const mongoose = require("mongoose");
const { Types } = mongoose;

const _ = require("lodash");
const database = require("../../configs/connectDatabase");
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
} = require("../../constants");

//#region OK
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
//#endregion

const getListReducingCoinsAndTokens = async () => {
	let reducingCoinsAndTokens = [];
	let rawData = await database.collection("tokens").get();

	rawData.forEach((doc) => {
		const data = doc.data();

		reducingCoinsAndTokens.push({
			id: data.id,
			name: data.name,
			symbol: data.symbol,
			iconURL: data.iconURL,
			tagNames: data.tagNames,
			usd: {
				percentChange24h: data.usd.percentChange24h,
				price: data.usd.price,
			},
			pricesLast1Day:
				data.id >= 1 && data.id <= 10
					? Object.entries(data.prices.day)
					: null,
		});
	});

	//sort asc
	reducingCoinsAndTokens.sort(
		(firstObj, secondObj) =>
			firstObj.usd.percentChange24h - secondObj.usd.percentChange24h,
	);

	// get first 10 tokens
	reducingCoinsAndTokens = reducingCoinsAndTokens.slice(0, 10);

	return reducingCoinsAndTokens;
};

const getListTrendingCoins = async () => {
	let trendingCoins = [];
	let rawData = await database
		.collection("tokens")
		.where("type", "==", "coin")
		.get();

	// get data
	rawData.forEach((doc) => {
		const data = doc.data();

		trendingCoins.push({
			id: data.id,
			name: data.name,
			symbol: data.symbol,
			iconURL: data.iconURL,
			tagNames: data.tagNames,
			circulatingSupply: data.circulatingSupply,
			marketCap: data.marketCap,
			usd: data.usd,
		});
	});

	// sort desc
	trendingCoins.sort(
		(firstObj, secondObj) =>
			secondObj.usd.percentChange24h - firstObj.usd.percentChange24h,
	);

	// get first 10 coins
	trendingCoins = trendingCoins.slice(0, 10);

	return trendingCoins;
};

const getListTrendingTokens = async () => {
	let trendingTokens = [];
	let rawData = await database
		.collection("tokens")
		.where("type", "==", "token")
		.get();

	// get data
	rawData.forEach((doc) => {
		const data = doc.data();

		trendingTokens.push({
			id: data.id,
			name: data.name,
			symbol: data.symbol,
			iconURL: data.iconURL,
			tagNames: data.tagNames,
			circulatingSupply: data.circulatingSupply,
			marketCap: data.marketCap,
			usd: data.usd,
		});
	});

	// sort desc
	trendingTokens.sort(
		(firstObj, secondObj) =>
			secondObj.usd.percentChange24h - firstObj.usd.percentChange24h,
	);

	// get first 10 tokens
	trendingTokens = trendingTokens.slice(0, 10);

	return trendingTokens;
};

const getCoinOrTokenDetails = async (coinSymbol) => {
	let coinInfo = {};
	let fullInfo = [];

	if (!coinSymbol) {
		return {};
	} else {
		fullInfo = await database
			.collection("tokens")
			.where("symbol", "==", coinSymbol.toUpperCase())
			.get();

		fullInfo.forEach((doc) => {
			const data = doc.data();

			coinInfo = {
				id: data.id,
				ethId: data.ethId,
				name: data.name,
				type: data.type,
				symbol: data.symbol,
				iconURL: data.iconURL,
				cmcRank: data.cmcRank,
				tagNames: data.tagNames,
				maxSupply: data.maxSupply,
				totalSupply: data.totalSupply,
				circulatingSupply: data.circulatingSupply,
				contractAddress: data.contractAddress,
				marketCap: data.marketCap,
				urls: data.urls,
				usd: data.usd,
				prices:
					data.id >= 1 && data.id <= 10
						? {
								day: Object.entries(data.prices.day),
								week: Object.entries(data.prices.week),
								month: Object.entries(data.prices.month),
								year: Object.entries(data.prices.year),
						  }
						: null,
			};
		});
	}

	return coinInfo;
};

//#region OK
const getListOfTags = async () => {
	const tags = await TagModel.find({}).sort("id").select("id name -_id");
	return tags;
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

const getTransactionsOfAllSharks = async (page) => {
	if (page < 1 || page % 1 !== 0) return [];

	const transactions = await TransactionModel.find({})
		.select("-_id")
		.sort("sortNumber")
		.skip((page - 1) * QUERY_LIMIT_ITEM)
		.limit(QUERY_LIMIT_ITEM);

	return transactions || [];
};

const getListTransactionsOfShark = async (sharkId) => {
	// const shark = await SharkModel.findOne({ id: sharkId }).select(
	// 	"transactionsHistory -_id",
	// );
	// return shark?.transactionsHistory || -1;

	return await getListOfCoinsAndTokens();
};
//#endregion

const getDetailCoinTransactionHistoryOfShark = async (sharkId, coinSymbol) => {
	try {
		if (sharkId === null) return { message: "sharkid-required" };

		if (sharkId === undefined) return { message: "sharkid-invalid" };

		if (!coinSymbol) return { message: "coinsymbol-required" };

		if (!(await checkExistedSharkId(sharkId)))
			return { message: "shark-notfound" };

		const sharks = await database
			.collection("sharks")
			.where("id", "==", sharkId)
			.get();

		let obj;

		sharks.forEach((doc) => {
			obj = doc
				.data()
				.historyDatas.find(
					(data) =>
						_.lowerCase(data.coinSymbol) ===
						_.lowerCase(coinSymbol),
				);
		});

		if (!obj) return { message: "coin-notfound" };

		return { message: "success", data: obj.historyData };
	} catch (error) {
		return { message: "error" };
	}
};

// OK
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
	getDetailCoinTransactionHistoryOfShark,
	getHoursPriceOfToken,
};
