const jwt = require("jsonwebtoken");
const firebase = require("firebase-admin");
const { cryptPassword, comparePassword } = require("../../helpers");
const {
    validateUserSignUpBody,
    validateUserSignInBody,
} = require("../../validators");
const {
    createNewUser,
    checkExistedUsername,
    checkExistedEmail,
    getPasswordByUsername,
} = require("../../services/user-crud-database");

function AuthController() {
    // [POST] /signup
    this.signup = async (req, res, next) => {
        const { username, email, phoneNumber, password } = req.body;

        // Validate request body
        const { status, error } = await validateUserSignUpBody(req, res, next);
        if (status === "failed") {
            return res.status(400).json({ message: error });
        }

        // Check if username or email is existed
        if (await checkExistedUsername(username)) {
            return res.status(400).json({ message: "Username is existed" });
        }
        if (await checkExistedEmail(email)) {
            return res.status(400).json({ message: "Email is existed" });
        }

        // Encode password and create new user in DB
        const currentTimestamp = firebase.firestore.Timestamp.now();
        cryptPassword(password, async function (error, hashPassword) {
            const newUser = {
                username: username,
                email: email,
                phoneNumber: phoneNumber,
                password: hashPassword,
                createdDate: currentTimestamp,
                updatedDate: currentTimestamp,
            };

            await createNewUser(newUser)
                .then(function () {
                    return res
                        .status(200)
                        .json({ message: "Sign up successfully" });
                })
                .catch(function (error) {
                    return res.status(401).json({
                        message: "Sign up failed with error: " + error,
                    });
                });
        });
    };

    // [POST] /signin
    this.signin = async (req, res, next) => {
        const { username, password } = req.body;

        // Validate request body
        const { status, error } = await validateUserSignInBody(req, res, next);
        if (status === "failed") {
            return res.status(400).json({ message: error });
        }

        // Check if not found username
        if (!(await checkExistedUsername(username))) {
            return res.status(400).json({ message: "Username is not found" });
        } else {
            const hashPassword = await getPasswordByUsername(username);

            // Compard password and hash password in DB
            comparePassword(
                password,
                hashPassword,
                function (error, isPasswordMatch) {
                    if (isPasswordMatch) {
                        // Set token

                        // Set cookie

                        return res.status(200).json({
                            message: "Sign in successfully",
                            token: token,
                        });
                    } else {
                        return res.status(400).json({
                            message: "Incorrect password",
                        });
                    }
                },
            );
        }
    };
}

module.exports = new AuthController();
