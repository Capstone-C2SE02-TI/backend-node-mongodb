const { body, validationResult } = require("express-validator");

const validateSignUpBody = async (req, res, next) => {
    await body("username")
        .notEmpty()
        .withMessage("username-required")
        .run(req);

    await body("email")
        .notEmpty()
        .withMessage("email-required")
        .matches(/.+@.+\..+/)
        .withMessage("email-invalid")
        .isLength({ min: 3, max: 32 })
        .withMessage("email-must-3-32-characters")
        .run(req);

    await body("phoneNumber")
        .notEmpty()
        .withMessage("phonenumber-required")
        .matches(/^\d{10}$/)
        .withMessage("phonenumber-invalid")
        .isLength({ min: 10, max: 10 })
        .withMessage("phonenumber-must-10-integer-characters")
        .run(req);

    await body("password")
        .notEmpty()
        .withMessage("password-required")
        .isLength({ min: 8, max: 16 })
        .withMessage("password-must-8-16-characters")
        .run(req);

    await body("confirmPassword")
        .notEmpty()
        .withMessage("passwordconfirm-required")
        .isLength({ min: 8, max: 16 })
        .withMessage("passwordconfirm-must-8-16-characters")
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                return false;
            }
            return true;
        })
        .withMessage("passwords-not-match")
        .run(req);

    const errors = validationResult(req);

    return {
        status: errors.isEmpty() ? "successfully" : "failed",
        error: errors.array()[0]?.msg,
    };
};

const validateSignInBody = async (req, res, next) => {
    await body("username")
        .notEmpty()
        .withMessage("username-required")
        .run(req);

    await body("password")
        .notEmpty()
        .withMessage("password-required")
        .isLength({ min: 8, max: 16 })
        .withMessage("password-must-8-16-characters")
        .run(req);

    const errors = validationResult(req);

    return {
        status: errors.isEmpty() ? "successfully" : "failed",
        error: errors.array()[0]?.msg,
    };
};

const validateSubmitEmailBody = async (req, res, next) => {
    await body("email")
        .notEmpty()
        .withMessage("email-required")
        .matches(/.+@.+\..+/)
        .withMessage("email-invalid")
        .isLength({ min: 3, max: 32 })
        .withMessage("email-must-3-32-characters")
        .run(req);

    const errors = validationResult(req);

    return {
        status: errors.isEmpty() ? "successfully" : "failed",
        error: errors.array()[0]?.msg,
    };
};

const validateSubmitCodeBody = async (req, res, next) => {
    await body("code")
        .notEmpty()
        .withMessage("code-required")
        .isNumeric()
        .isLength({ min: 6, max: 6 })
        // .matches(/.+@.+\..+/)
        .withMessage("code-invalid")
        // .isLength({ min: 3, max: 32 })
        // .withMessage("code-must-6-characters")
        .run(req);

    const errors = validationResult(req);

    return {
        status: errors.isEmpty() ? "successfully" : "failed",
        error: errors.array()[0]?.msg,
    };
};

const validateCreateNewPasswordBody = async (req, res, next) => {
    await body("password")
        .notEmpty()
        .withMessage("password-required")
        .isLength({ min: 8, max: 16 })
        .withMessage("password-must-8-16-characters")
        .run(req);

    await body("confirmPassword")
        .notEmpty()
        .withMessage("passwordconfirm-required")
        .isLength({ min: 8, max: 16 })
        .withMessage("passwordconfirm-must-8-16-characters")
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                return false;
            }
            return true;
        })
        .withMessage("passwords-not-match")
        .run(req);

    const errors = validationResult(req);

    return {
        status: errors.isEmpty() ? "successfully" : "failed",
        error: errors.array()[0]?.msg,
    };
};

module.exports = {
    validateSignUpBody,
    validateSignInBody,
    validateSubmitEmailBody,
    validateSubmitCodeBody,
    validateCreateNewPasswordBody,
};
