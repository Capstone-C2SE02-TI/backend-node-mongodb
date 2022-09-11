const firebase = require("firebase-admin");
const { cryptPassword, comparePassword } = require("../../helpers");
const {
    isAuthed,
    verifyToken,
    decodeToken,
    generateAccessToken,
} = require("../../services/authentication");
const { validateUserSignUpBody, validateUserSignInBody } = require("../../validators");
const {
    getUserByUsername,
    createNewUser,
    checkExistedUsername,
    checkExistedEmail,
    getPasswordByUsername,
} = require("../../services/crud-database/user");

function AuthController() {
    this.signup = async (req, res, next) => {
        const { username, email, phoneNumber, password } = req.body;

        // Validate request body
        const { status, error } = await validateUserSignUpBody(req, res, next);
        if (status === "failed") {
            return res.status(400).json({ message: error });
        }

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
                    return res.status(200).json({ message: "Sign up successfully" });
                })
                .catch(function (error) {
                    return res.status(400).json({
                        message: "Sign up failed with error: " + error,
                    });
                });
        });
    };

    this.signin = async (req, res, next) => {
        const { username, password } = req.body;

        // Validate request body
        const { status, error } = await validateUserSignInBody(req, res, next);
        if (status === "failed") {
            return res.status(400).json({ message: error });
        }

        if (!(await checkExistedUsername(username))) {
            return res.status(404).json({ message: "Username is not found" });
        } else {
            const hashPassword = await getPasswordByUsername(username);

            comparePassword(password, hashPassword, async (error, isPasswordMatch) => {
                if (isPasswordMatch) {
                    const cookie = req.cookies.TI_AUTH_COOKIE;

                    if (!cookie) {
                        const accessToken = await generateAccessToken({
                            username,
                        });

                        res.cookie("TI_AUTH_COOKIE", accessToken, {
                            // Expire in 1 week
                            maxAge: 604800000,
                            httpOnly: true,
                        });

                        return res.status(200).json({
                            message: "Sign in successfully",
                            accessToken: accessToken,
                            user: {
                                username: username,
                            },
                        });
                    } else {
                        if (isAuthed(req)) {
                            return res.status(200).json({
                                message: "Sign in successfully",
                                accessToken: cookie,
                                user: {
                                    username: username,
                                },
                            });
                        } else {
                            return res.status(401).json({
                                message: "Sign in failed",
                                accessToken: null,
                            });
                        }
                    }
                } else {
                    return res.status(400).json({
                        message: "Incorrect password",
                    });
                }
            });
        }
    };
}

module.exports = new AuthController();
