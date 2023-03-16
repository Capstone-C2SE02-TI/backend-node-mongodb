import {
	validateUsername,
	validateEmail,
	validateEmailOptional,
	validatePhoneNumber,
	validatePhoneNumberOptional,
	validatePassword,
	validateConfirmPassword,
	validateCode,
	validateOldPassword,
	validateNewPassword,
	validateNewConfirmPassword,
	validateFullNameOptional,
	validateWebsiteOptional,
	validateAvatarOptional,
	returnValidationResult
} from "./index.js";

export const validateSignUpBody = async (req) => {
	await Promise.all([
		validateUsername(req),
		validateEmail(req),
		validatePhoneNumber(req),
		validatePassword(req),
		validateConfirmPassword(req)
	]);
	return returnValidationResult(req);
};

export const validateSignInBody = async (req) => {
	await Promise.all([validateUsername(req), validatePassword(req)]);
	return returnValidationResult(req);
};

export const validateSubmitEmailBody = async (req) => {
	await validateEmail(req);
	return returnValidationResult(req);
};

export const validateSubmitCodeBody = async (req) => {
	await Promise.all([validateEmail(req), validateCode(req)]);
	return returnValidationResult(req);
};

export const validateCreateNewPasswordBody = async (req) => {
	await Promise.all([
		validateEmail(req),
		validatePassword(req),
		validateConfirmPassword(req)
	]);
	return returnValidationResult(req);
};

export const validateChangePasswordBody = async (req) => {
	await Promise.all([
		validateEmail(req),
		validateOldPassword(req),
		validateNewPassword(req),
		validateNewConfirmPassword(req)
	]);
	return returnValidationResult(req);
};

export const validateUpdateProfileBody = async (req) => {
	await Promise.all([
		// validateFullNameOptional(req),
		validateEmailOptional(req),
		validatePhoneNumberOptional(req),
		validateWebsiteOptional(req),
		validateAvatarOptional(req)
	]);
	return returnValidationResult(req);
};
