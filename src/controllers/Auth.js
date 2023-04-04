import dotenv from "dotenv";
dotenv.config();

import { createNewUser } from "../services/crudDatabase/user.js";
import {
	cryptWalletAddress,
	decryptWalletAddress,
	encryptWalletAddress
} from "../helpers/index.js";

const TI_AUTH_COOKIE = process.env.TI_AUTH_COOKIE;

function AuthController() {
	this.signup = async (req, res, next) => {
		const { walletAddress } = req.body;

		const hashWallet = encryptWalletAddress(walletAddress);

		const detailCreated = await createNewUser(hashWallet.encryptedData);

		detailCreated.created
			? res.status(200).json({
					message: detailCreated.message,
					error: null
			  })
			: res.status(400).json({
					message: detailCreated.message,
					error: detailCreated.error
			  });
	};
}

export default new AuthController();
