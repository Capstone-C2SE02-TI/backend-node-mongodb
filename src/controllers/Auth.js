import dotenv from "dotenv";
dotenv.config();

import { createNewUser} from "../services/crudDatabase/user.js";

function AuthController() {
	this.signup = async (req, res, next) => {
		const { walletAddress } = req.body;

		const detailCreated = await createNewUser(walletAddress);

		detailCreated.created
			? res.status(200).json({
					message: detailCreated.message,
					error: detailCreated.error
			  })
			: res.status(400).json({
					message: detailCreated.message,
					error: detailCreated.error
			  });
	};
}

export default new AuthController();
