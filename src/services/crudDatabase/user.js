import {
	UserModel,
	CoinModel,
	InvestorModel,
	TagModel,
	TransactionModel
} from "../../models/index.js";
import {
	QUERY_LIMIT_ITEM,
	TRENDING_REDUCING_LIMIT_ITEM
} from "../../constants/index.js";
import got from "got";
import tulind from "tulind";
import { getAutoId } from "../../helpers/index.js";
import _ from "lodash";

export const getUserByEmail = async (email) => {
	return await UserModel.findOne({ email: email }).lean();
};

export const getUsersLength = async () => {
	return await UserModel.count({}).lean();
};

export const checkExistedWalletAddress = async (walletAddress) => {
	const isExisted = await UserModel.exists({
		walletAddress: walletAddress
	}).lean();
	return Boolean(isExisted);
};

export const createNewUser = async (walletAddress) => {
	try {
		const isExistedWallet = await checkExistedWalletAddress(walletAddress);
		if (isExistedWallet)
			return {
				created: false,
				message: "wallet-address-existed",
				error: null
			};

		const newUserInfo = {
			walletAddress: walletAddress
		};

		await UserModel.create(newUserInfo)
			.then((data) => {
				return {
					created: true,
					message: "create-user-successfully",
					error: null
				};
			})
			.catch((error) => {
				throw error;
			});

		return {
			created: true,
			message: "create-user-successfully",
			error: null
		};
	} catch (error) {
		return {
			created: false,
			message: "create-user-failed",
			error: error
		};
	}
};

export const updateUserConfirmationCode = async (userId, code) => {
	try {
		await UserModel.findOneAndUpdate(
			{ userId: userId },
			{ confirmationCode: code }
		)
			.lean()
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

export const updateUserIsCodeConfirmed = async (userId, isCodeConfirmed) => {
	try {
		await UserModel.findOneAndUpdate(
			{ userId: userId },
			{ isCodeConfirmed: isCodeConfirmed }
		)
			.lean()
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

export const updateUserPassword = async (userId, password) => {
	try {
		await UserModel.findOneAndUpdate({ userId: userId }, { password: password })
			.lean()
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

export const checkExistedEmail = async (email) => {
	const isExisted = await UserModel.exists({ email: email }).lean();
	return Boolean(isExisted);
};

export const checkExistedSharkId = async (sharkId) => {
	const isExisted = await InvestorModel.exists({ sharkId: sharkId }).lean();
	return Boolean(isExisted);
};

export const checkExistedSharkAddress = async (sharkAddress) => {
	const isExisted = await InvestorModel.exists({
		walletAddress: sharkAddress
	}).lean();
	return Boolean(isExisted);
};

export const getListOfCoinsAndTokens = async () => {
	const tokens = await CoinModel.find({})
		.select(
			"coinId name type symbol iconURL tagNames cmcRank usd marketCap circulatingSupply pricesLast1Month -_id"
		)
		.sort("coinId")
		.lean();

	return tokens || [];
};

export const getCoinsAndTokensLength = async () => {
	return await CoinModel.count({}).lean();
};

export const getListReducingCoinsAndTokens = async () => {
	return await CoinModel.find({})
		.sort({ "usd.percentChange24h": "asc" })
		.limit(TRENDING_REDUCING_LIMIT_ITEM)
		.select(
			"coinId name type symbol iconURL tagNames usd pricesLast1Month -_id"
		)
		.lean();
};

export const getListTrendingCoins = async () => {
	return await CoinModel.find({ type: "coin" })
		.sort({ "usd.percentChange24h": "desc" })
		.limit(TRENDING_REDUCING_LIMIT_ITEM)
		.select(
			"coinId name type symbol iconURL tagNames usd marketCap circulatingSupply -_id"
		)
		.lean();
};

export const getListTrendingTokens = async () => {
	return await CoinModel.find({ type: "token" })
		.sort({ "usd.percentChange24h": "desc" })
		.limit(TRENDING_REDUCING_LIMIT_ITEM)
		.select(
			"coinId name type symbol iconURL tagNames usd marketCap circulatingSupply -_id"
		)
		.lean();
};

export const getCoinOrTokenDetails = async (coinSymbol) => {
	const coinOrToken = await CoinModel.findOne({
		symbol: coinSymbol.toLowerCase()
	})
		.select(
			"coinId ethId coingeckoId name type symbol iconURL cmcRank tagNames maxSupply totalSupply circulatingSupply contractAddress marketCap urls usd prices totalInvestment -_id"
		)
		.lean();

	return coinOrToken || {};
};

export const getListOfTags = async () => {
	return await TagModel.find({}).sort("id").select("id name -_id").lean();
};

export const getSharksLength = async () => {
	return await InvestorModel.count({}).lean();
};

export const getListOfSharks = async (walletAddress) => {
	const projection = {
		sharkId: 1,
		walletAddress: 1,
		totalAssets: 1,
		percent24h: 1,
		followers: 1,
		isShark: 1
	};
	const sharks = await InvestorModel.find({ isShark: true }, projection, {
		new: true
	})
		.sort("sharkId")
		.lean();

	const sharksList = sharks.map((shark) => {
		const isFollowed = shark.followers.includes(walletAddress);
		let objShark = { ...shark, isFollowed: isFollowed };
		return objShark;
	});

	return sharksList;
};

export const followWalletOfShark = async (walletAddress, sharkId) => {
	try {
		if (walletAddress === null) return { message: "wallet-address-required" };
		if (walletAddress === undefined)
			return { message: "wallet-address-invalid" };

		if (sharkId === null) return { message: "sharkid-required" };
		if (sharkId === undefined) return { message: "sharkid-invalid" };

		if (!(await checkExistedWalletAddress(walletAddress)))
			return { message: "user-notfound" };
		if (!(await checkExistedSharkId(sharkId)))
			return { message: "shark-notfound" };
		const projection = {
			sharkId: 1,
			walletAddress: 1,
			totalAssets: 1,
			percent24h: 1,
			followers: 1
		};
		const shark = await InvestorModel.findOne({ sharkId: sharkId }, projection);

		const sharkFollowers = shark.followers;

		if (sharkFollowers && sharkFollowers.some((id) => id === walletAddress))
			return { message: "already-followed" };

		shark.followers.push(walletAddress);
		shark.save();

		return {
			message: "success",
			data: { ...shark._doc, isFollowed: true }
		};
	} catch (error) {
		return { message: "error-follow-failed", error: error };
	}
};

export const unfollowWalletOfShark = async (walletAddress, sharkId) => {
	try {
		console.log(walletAddress);
		if (walletAddress === null) return { message: "wallet-address-required" };
		if (walletAddress === undefined)
			return { message: "wallet-address-invalid" };
		if (sharkId === null) return { message: "sharkid-required" };
		if (sharkId === undefined) return { message: "sharkid-invalid" };

		if (!(await checkExistedWalletAddress(walletAddress)))
			return { message: "user-notfound" };
		if (!(await checkExistedSharkId(sharkId)))
			return { message: "shark-notfound" };

		const projection = {
			sharkId: 1,
			walletAddress: 1,
			totalAssets: 1,
			percent24h: 1,
			followers: 1
		};
		const shark = await InvestorModel.findOne({ sharkId: sharkId }, projection);

		const sharkFollowers = shark.followers;

		if (sharkFollowers && !sharkFollowers.some((id) => id === walletAddress))
			return { message: "not-followed" };

		shark.followers.pull(walletAddress);
		shark.save();

		return {
			message: "success",
			data: { ...shark._doc, isFollowed: false }
		};
	} catch (error) {
		return { message: "error-unfollow-failed", error: error };
	}
};

export const getListOfSharkFollowed = async (walletAddress) => {
	if (walletAddress === null) return { message: "wallet-address-required" };
	if (walletAddress === undefined) return { message: "wallet-address-invalid" };
	if (!(await checkExistedWalletAddress(walletAddress)))
		return { message: "user-notfound" };

	const projection = {
		sharkId: 1,
		totalAssets: 1,
		percent24h: 1,
		walletAddress: 1,
		totalValueIn: 1,
		totalValueOut: 1
	};

	const users = await InvestorModel.find(
		{ followers: { $in: [walletAddress] } },
		projection
	).lean();

	return { message: "success", datas: users || [] };
};

export const getListCryptosOfShark = async (sharkId) => {
	const shark = await InvestorModel.findOne({ sharkId: sharkId })
		.select("cryptos -_id")
		.lean();
	return shark?.cryptos || -1;
};

export const getTransactionsLengthForPage = async (valueFilter = 0) => {
	return await TransactionModel.aggregate([
		{
			$project: {
				total: { $multiply: ["$presentPrice", "$numberOfTokens"] }
			}
		},

		{ $match: { total: { $gte: valueFilter } } },
		{ $count: "transactionsLength" }
	]);
};

export const getTransactionsOfAllSharks = async (page, valueFilter = 0) => {
	if (page < 1 || page % 1 !== 0) return [];

	const transactions = await TransactionModel.aggregate([
		{
			$project: {
				_id: 0,
				walletAddress: 1,
				timeStamp: 1,
				sharkId: 1,
				hash: 1,
				from: 1,
				to: 1,
				tokenName: 1,
				tokenSymbol: 1,
				numberOfTokens: 1,
				pastPrice: 1,
				presentPrice: 1,
				total: { $multiply: ["$presentPrice", "$numberOfTokens"] }
			}
		},

		{ $match: { total: { $gte: valueFilter } } }
	])
		.sort({ timeStamp: "desc" })
		.skip((page - 1) * QUERY_LIMIT_ITEM)
		.limit(QUERY_LIMIT_ITEM);

	return transactions || [];
};

export const getNewTransactions = async (sharkId) => {
	// new transactions in 60 secs
	const project = {
		_id: 0,
		transactionsHistory: {
			$map: {
				input: "$transactionsHistory",
				as: "transactionsHistory",
				in: {
					timeStamp: { $toInt: "$$transactionsHistory.timeStamp" },
					blockNumber: "$$transactionsHistory.blockNumber",
					hash: "$$transactionsHistory.hash",
					nonce: "$$transactionsHistory.nonce",
					blockHash: "$$transactionsHistory.blockHash",
					from: "$$transactionsHistory.from",
					contractAddress: "$$transactionsHistory.contractAddress",
					to: "$$transactionsHistory.to",
					value: "$$transactionsHistory.value",
					tokenName: "$$transactionsHistory.tokenName",
					tokenSymbol: "$$transactionsHistory.tokenSymbol",
					tokenDecimal: "$$transactionsHistory.tokenDecimal",
					transactionIndex: "$$transactionsHistory.transactionIndex",
					gas: "$$transactionsHistory.gas",
					gasPrice: "$$transactionsHistory.gasPrice",
					gasUsed: "$$transactionsHistory.gasUsed",
					cumulativeGasUsed: "$$transactionsHistory.cumulativeGasUsed",
					input: "$$transactionsHistory.input",
					confirmations: "$$transactionsHistory.confirmations",

				}
			}
		}

	};

	let transactions = await InvestorModel.findOne({ sharkId: sharkId }, project);

	transactions.transactionsHistory = transactions.transactionsHistory.filter(
		(element) => {
			// data in 60 secs
			const time = Math.floor(Date.now() / 1000) - 60;
			return element.timeStamp >= time;
		}
	);

	return transactions;
};

export const getListTransactionsOfShark = async (sharkId) => {
	const shark = await InvestorModel.findOne({ sharkId: sharkId })
		.select("transactionsHistory -_id")
		.lean();
	return shark?.transactionsHistory || -1;
};

export const getTradeTransactionHistoryOfShark = async (
	sharkId,
	coinSymbol
) => {
	try {
		if (sharkId === null) return { message: "sharkid-required" };
		if (sharkId === undefined) return { message: "sharkid-invalid" };
		if (!coinSymbol) return { message: "coinsymbol-required" };
		if (!(await checkExistedSharkId(sharkId)))
			return { message: "shark-notfound" };

		const sharks = await InvestorModel.findOne({ sharkId: sharkId }).select(
			"historyDatas cryptos -_id"
		);
		const { historyDatas, cryptos } = sharks;

		// Need reset to toLowerCase()
		const historyData = historyDatas
			.find((data) => data.coinSymbol === coinSymbol.toUpperCase())
			.lean();

		const coinInfo = await CoinModel.findOne({
			symbol: coinSymbol.toLowerCase()
		})
			.select(
				"coinId name symbol iconURL cmcRank maxSupply totalSupply circulatingSupply marketCap contractAddress prices -_id"
			)
			.lean();

		// Need reset to toLowerCase()
		if (!historyData) {
			if (
				cryptos &&
				cryptos.find((crypto) => crypto.symbol === coinSymbol.toUpperCase())
			) {
				return {
					message: "success",
					data: {
						historyData: null,
						coinInfo: coinInfo || null
					}
				};
			} else {
				return { message: "coin-notfound" };
			}
		} else {
			return {
				message: "success",
				data: {
					historyData: historyData.historyData || null,
					coinInfo: coinInfo || null
				}
			};
		}
	} catch (error) {
		return { message: "error" };
	}
};

export const getHoursPriceOfToken = async (tokenSymbol) => {
	const token = await CoinModel.findOne({
		symbol: tokenSymbol.toLowerCase()
	})
		.select("originalPrices -_id")
		.lean();

	return token?.originalPrices?.hourly || {};
};

export const getGainLossOfSharks = async (isLoss) => {
	const sortType = isLoss ? "asc" : "desc";

	const sharkGainLoss = isLoss
		? await InvestorModel.find({})
			.select("sharkId totalAssets percent24h -_id")
			.where("percent24h")
			.lt(0)
			.sort({ percent24h: sortType })
			.limit(20)
			.lean()
		: await InvestorModel.find({})
			.select("sharkId totalAssets percent24h -_id")
			.where("percent24h")
			.gte(0)
			.sort({ percent24h: sortType })
			.limit(20)
			.lean();

	return sharkGainLoss;
};

export const getGainLossOfCoins = async (isLoss) => {
	const sortType = isLoss ? "asc" : "desc";

	const sharkGainLoss = isLoss
		? await CoinModel.find({})
			.select("symbol usd.price usd.percentChange24h -_id")
			.where("usd.percentChange24h")
			.lt(0)
			.sort({ "usd.percentChange24h": sortType })
			.limit(20)
			.lean()
		: await CoinModel.find({})
			.select("symbol usd.price usd.percentChange24h -_id")
			.where("usd.percentChange24h")
			.gte(0)
			.sort({ "usd.percentChange24h": sortType })
			.limit(20)
			.lean();

	return sharkGainLoss;
};

export const addNewShark = async (walletAddress, sharkWalletAddress) => {
	try {
		if (!(await checkExistedWalletAddress(walletAddress)))
			return { message: "user-notfound", isAdded: false };

		const sharkExisted = await InvestorModel.findOne(
			{
				walletAddress: sharkWalletAddress.toLowerCase()
			},
			{ new: true }
		);

		if (sharkExisted !== null)
			return { message: "wallet-address-exists", isAdded: false };

		const autoId = await getAutoId("sharkId");

		console.log(sharkWalletAddress.toLowerCase());

		const addedData = await InvestorModel.create({
			sharkId: autoId.seq,
			walletAddress: sharkWalletAddress.toLowerCase(),
			isShark: true
		});

		const user = await UserModel.findOneAndUpdate(
			{ walletAddress: walletAddress },
			{ $push: { addedSharks: sharkWalletAddress.toLowerCase() } },
			{ new: true }
		);

		let addedSharks = user.addedSharks;

		return {
			message: "successfully",
			isAdded: true,
			data: addedData,
			sharkAdded: addedSharks
		};
	} catch (error) {
		return { message: "error", error: error };
	}
};

export const deleteSharkNotFound = async (walletAddress, addedSharkAddress) => {
	try {
		if (!(await checkExistedWalletAddress(walletAddress)))
			return { message: "user-notfound", isDeleted: false };

		const sharkExisted = await InvestorModel.findOne({
			walletAddress: addedSharkAddress
		}).lean();

		if (sharkExisted === null)
			return { message: "wallet-address-not-exists", isAdded: false };

		// Tuan's comment
		const user = await UserModel.findOneAndUpdate(
			{ userId: userId },
			{ $pull: { addedSharks: addedSharkAddress } }
		).lean();

		const deletedData = await InvestorModel.remove({
			walletAddress: addedSharkAddress
		}).lean();

		return deletedData.deletedCount > 0
			? { message: "successfully", isDeleted: true }
			: { message: "wallet-address-notfound", isDeleted: false };
	} catch (error) {
		return { message: "error", error: error };
	}
};

export const getLengthOfSharksList = async () => {
	try {
		const length = await InvestorModel.count({ isShark: true }).lean();

		return { message: "success", length: length };
	} catch (err) {
		return { message: "failed-get-length", error: err };
	}
};

export const getLengthOfUsersList = async () => {
	try {
		const length = await UserModel.count({}).lean();

		return { message: "success", length: length };
	} catch (err) {
		return { message: "failed-get-length", error: err };
	}
};

export const getLengthOfTransactionsList = async () => {
	try {
		const length = await TransactionModel.count({}).lean();

		return { message: "success", length: length };
	} catch (err) {
		return { message: "failed-get-length", error: err };
	}
};

export const getIndicatorsData = async (urlApis, period) => {
	const resp = await got(urlApis);
	const data = JSON.parse(resp.body);
	let klinedata = data.map((d) => ({
		time: d[0] / 1000,
		open: d[1] * 1,
		high: d[2] * 1,
		low: d[3] * 1,
		close: d[4] * 1
	}));
	const closeData = klinedata.map((d) => d.close);
	tulind.indicators.sma.indicator([closeData], [1], function (err, results) {
		const amas = results[0];
		klinedata = klinedata.map((d, index) => ({
			...d,
			sma: amas[index]
		}));
	});

	tulind.indicators.ema.indicator(
		[closeData],
		[period],
		function (err, results) {
			const emas = results[0];
			klinedata = klinedata.map((d, index) => ({
				...d,
				ema: emas[index]
			}));
		}
	);

	klinedata = klinedata.map((d, i, arr) => {
		const long =
			arr[i]?.ema > arr[i]?.sma && arr[i - 1]?.ema < arr[i - 1]?.sma
				? true
				: false;
		const short =
			arr[i]?.ema < arr[i]?.sma && arr[i - 1]?.ema > arr[i - 1]?.sma
				? true
				: false;
		return { ...d, long, short };
	});

	tulind.indicators.rsi.indicator(
		[closeData],
		[period],
		function (err, results) {
			const rsis = results[0];
			klinedata = klinedata.map((d, index) => ({
				...d,
				rsi: rsis[index]
			}));
		}
	);

	tulind.indicators.macd.indicator(
		[closeData],
		[12, 26, 9],
		function (err, results) {
			const madc1 = results[0];
			const madc2 = results[1];
			const madc3 = results[2];
			klinedata = klinedata.map((d, index) => ({
				...d,
				macd_fast: madc1[index],
				macd_slow: madc2[index],
				macd_histogram: madc3[index]
			}));
		}
	);

	return klinedata;
};

export const saveAutoTrading = async (
	userAddress,
	sharkAddress,
	fromToken,
	toToken,
	fromSymbol,
	toSymbol,
	ethAmount
) => {
	try {
		console.log(userAddress,
			sharkAddress,
			fromToken,
			toToken,
			ethAmount);
		let isExistedWallet = await checkExistedWalletAddress(userAddress);
		if (!isExistedWallet)
			return {
				isSaved: false,
				message: "save-failed",
				error: "user-not-found"
			};

		isExistedWallet = await checkExistedSharkAddress(sharkAddress);
		if (!isExistedWallet)
			return {
				isSaved: false,
				message: "save-failed",
				error: "shark-not-found"
			};
		if (_.isNull(ethAmount))
			return {
				isSaved: false,
				message: "save-failed",
				error: "usd-must-a-number"
			};

		const filter = {
			walletAddress: userAddress,
			autoTrading: {
				$elemMatch: {
					sharkAddress: sharkAddress,
					fromToken: fromToken,
					toToken: toToken
				}
			}
		};

		const autoTradeInfo = await UserModel.findOne(filter);

		if (autoTradeInfo !== null) {
			return {
				isSaved: false,
				message: "save-failed",
				error: "pair-already-existed"
			};
		}
		const projection = {
			_id: 0,
			walletAddress: 1,
			sharkId: 1
		};
		const shark = await InvestorModel.findOne(
			{ walletAddress: sharkAddress },
			projection
		);
		console.log(shark);
		const trading = {
			sharkAddress: sharkAddress,
			sharkId: shark.sharkId,
			fromToken: fromToken,
			toToken: toToken,
			fromSymbol: fromSymbol,
			toSymbol: toSymbol,
			ethAmount: ethAmount,
			message: "",
			status: true,
			txhash: []
		};

		const user = await UserModel.findOneAndUpdate(
			{ walletAddress: userAddress },
			{ $push: { autoTrading: trading } }
		);
		return {
			isSaved: true,
			message: "save-successful",
			error: null,
			data: trading
		};
	} catch (error) {
		return {
			isSaved: false,
			message: "save-failed",
			error: error.message
		};
	}
};

export const getTradingList = async (userAddress) => {
	try {
		let isExistedWallet = await checkExistedWalletAddress(userAddress);
		if (!isExistedWallet)
			return {
				data: null,
				message: "get-failed",
				error: "user-not-found"
			};

		const project = {
			_id: 0,
			autoTrading: 1
		};

		const transactions = await UserModel.findOne(
			{ walletAddress: userAddress },
			project
		);
		return {
			data: transactions.autoTrading,
			message: "success",
			error: null
		};
	} catch (error) {
		return {
			data: null,
			message: "get-failed",
			error: error
		};
	}
};

export const deleteTradeData = async (
	userAddress,
	sharkAddress,
	fromToken,
	toToken,
	ethAmount
) => {
	try {
		let isExistedWallet = await checkExistedWalletAddress(userAddress);
		if (!isExistedWallet)
			return {
				data: null,
				message: "delete-failed",
				error: "user-not-found"
			};

		isExistedWallet = await checkExistedSharkAddress(sharkAddress);
		if (!isExistedWallet)
			return {
				data: null,
				message: "delete-failed",
				error: "shark-not-found"
			};

		const project = {
			autoTrading: {
				$elemMatch: {
					sharkAddress: sharkAddress,
					fromToken: fromToken,
					toToken: toToken,
					ethAmount: ethAmount
				}
			}
		};

		let transactions = await UserModel.updateOne(
			project,
			{
				$pull: {
					autoTrading: {
						sharkAddress: sharkAddress,
						fromToken: fromToken,
						toToken: toToken,
						ethAmount: ethAmount
					}
				}
			},
			{
				maxTimeMS: 30000
			}
		);

		const deletedAutoTradeData = transactions;

		return {
			data: deletedAutoTradeData,
			message: "success",
			error: null
		};
	} catch (error) {
		return {
			data: null,
			message: "delete-failed",
			error: error.message
		};
	}
};
