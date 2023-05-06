import _ from "lodash";
import { saveAutoTrading } from "../services/crudDatabase/user.js";

function TradingController() {
	this.saveAutoTrading = async (req, res, next) => {
		const { userAddress, sharkAddress, fromToken, toToken } =
			req.body;

        let {usdAmount} = req.body;
        
        if (!usdAmount) usdAmount = null;
        else {
            usdAmount = _.toNumber(usdAmount);

            if (_.isNaN(usdAmount)) usdAmount = null;
        }
		const tradingDetail = await saveAutoTrading(
			userAddress,
			sharkAddress,
			fromToken,
			toToken,
			usdAmount
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
