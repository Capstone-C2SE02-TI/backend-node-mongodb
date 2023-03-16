import {
	validateUsername,
	validatePassword,
	returnValidationResult
} from "./index.js";

export const validateSignInBody = async (req) => {
	await Promise.all([validateUsername(req), validatePassword(req)]);
	return returnValidationResult(req);
};
