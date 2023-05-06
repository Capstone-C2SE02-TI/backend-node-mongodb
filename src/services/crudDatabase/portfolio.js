import { InvestorModel } from "../../models/index.js";

export const getPortfolio = async (userWalletAddress) => {
	const users = await InvestorModel.find({
		followers: { $in: [userWalletAddress] }
	}).lean();

	const datas = users.map((user) => {
		return {
			sharkId: user.sharkId,
			totalAssets: user.totalAssets,
			actualGrowth: user.percent24h,
			walletAddress: user.walletAddress,
			totalTransactions: user.transactionsHistory.length
		};
	});

	return datas;
};
