import _ from "lodash";
import { getPortfolio } from "../services/crudDatabase/portfolio.js";

function PortfolioController() {
	this.getPortfolio = async (req, res, next) => {
		const walletAddress = req.params.walletAddress;
		await getPortfolio(walletAddress)
			.then((data) =>
				data
					? res.status(200).json({
							message: "successfully",
							error: null,
							data: data
					  })
					: res.status(400).json({
							message: "failed",
							error: null,
							data: null
					  })
			)
			.catch((error) =>
				res.status(400).json({
					message: "failed",
					error: error,
					data: null
				})
			);
	};
}

export default new PortfolioController();
