const firebase = require("firebase-admin");
const { validateUserSignUpBody } = require("../../validators");
const { cryptPassword, comparePassword } = require("../../helpers");
const {
    createNewUser,
    checkExistedUsername,
    checkExistedEmail,
} = require("../../services/user-crud-database");

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
        cryptPassword(password, async function (err, hashPassword) {
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
                    return res.status(400).json({
                        message: "Sign up failed with error: " + error,
                    });
                });
        });
    };

    // [POST] /signin
    this.signin = (req, res, next) => {
        res.send({ message: "Sign in successfully" });
    };
}

module.exports = new AuthController();
