const { body, validationResult } = require("express-validator");

async function validateUserSignUpBody(req, res, next) {
    await body("username")
        .notEmpty()
        .withMessage("Username is required")
        .run(req);

    await body("email")
        .notEmpty()
        .withMessage("Email is required")
        .matches(/.+@.+\..+/)
        .withMessage("Invalid email")
        .isLength({ min: 3, max: 32 })
        .withMessage("Email must be between 3 to 32 characters")
        .run(req);

    await body("phoneNumber")
        .notEmpty()
        .withMessage("Phone number is required")
        .matches(/^\d{10}$/)
        .withMessage("Invalid phone number")
        .isLength({ min: 10, max: 10 })
        .withMessage("Phone number must be 10 integer characters")
        .run(req);

    await body("password")
        .notEmpty()
        .withMessage("Password is required")
        .isLength({ min: 8, max: 16 })
        .withMessage("Password must contain from 8 to 16 characters")
        .run(req);

    const errors = validationResult(req);

    return {
        status: errors.isEmpty() ? "success" : "failed",
        error: errors.array()[0]?.msg,
    };
}

async function validateUserSignInBody(req, res, next) {
    await body("username")
        .notEmpty()
        .withMessage("Username is required")
        .run(req);

    await body("password")
        .notEmpty()
        .withMessage("Password is required")
        .isLength({ min: 8, max: 16 })
        .withMessage("Password must contain from 8 to 16 characters")
        .run(req);

    const errors = validationResult(req);

    return {
        status: errors.isEmpty() ? "success" : "failed",
        error: errors.array()[0]?.msg,
    };
}

module.exports = { validateUserSignUpBody, validateUserSignInBody };
