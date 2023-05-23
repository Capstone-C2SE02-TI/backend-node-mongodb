import _ from "lodash";
import { saveAutoTrading } from "../services/crudDatabase/user.js";

function TradingController() {
	this.saveAutoTrading = async (req, res, next) => {
		const { userAddress, sharkAddress, fromToken, toToken } =
			req.body;

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
}

export default new TradingController();
