import {
	validateUsername,
	validatePassword,
	returnValidationResult
} from "./index.js";

const validateSignInBody = async (req, res, next) => {
	await validateUsername(req);
	await validatePassword(req);
	return returnValidationResult(req);
};

export { validateSignInBody };
