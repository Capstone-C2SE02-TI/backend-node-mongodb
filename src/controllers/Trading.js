import _ from "lodash";
import {
	deleteTradeData,
	getTradingList,
	saveAutoTrading
} from "../services/crudDatabase/user.js";

function TradingController() {
	this.saveAutoTrading = async (req, res, next) => {
		const { userAddress, sharkAddress, fromToken, toToken } = req.body;

		let { ethAmount } = req.body;

		if (!ethAmount) ethAmount = null;
		else {
			ethAmount = _.toNumber(ethAmount);

			if (_.isNaN(ethAmount)) ethAmount = null;
		}
		const tradingDetail = await saveAutoTrading(
			userAddress,
			sharkAddress,
			fromToken,
			toToken,
			ethAmount
		);

		tradingDetail.isSaved
			? res.status(200).json({
				message: tradingDetail.message,
				error: tradingDetail.error
			})
			: res.status(400).json({
				message: tradingDetail.message,
				error: tradingDetail.error
			});
	};

	this.getListTradingUser = async (req, res, next) => {
		const { userAddress } = req.body;
		const tradingList = await getTradingList(userAddress);

		tradingList.message === "success"
			? res.status(200).json({
					message: tradingList.message,
					error: tradingList.error,
					data: tradingList.data
			  })
			: res.status(400).json({
					message: tradingList.message,
					error: tradingList.error,
					data: tradingList.data
			  });
	};

	this.deleteTrade = async (req, res) => {
		const { userAddress, sharkAddress, fromToken, toToken } = req.body;
		let { ethAmount } = req.body;
		if (!ethAmount) ethAmount = null;
		else {
			ethAmount = _.toNumber(ethAmount);

			if (_.isNaN(ethAmount)) ethAmount = null;
		}
		const deletedData = await deleteTradeData(
			userAddress,
			sharkAddress,
			fromToken,
			toToken,
			ethAmount
		);

		deletedData.message === "success"
			? res.status(200).json({
					message: deletedData.message,
					error: deletedData.error,
					data: deletedData.data
			  })
			: res.status(400).json({
						message: deletedData.message,
						error: deletedData.error,
						data: deletedData.data
					});
	};
}

export default new TradingController();
