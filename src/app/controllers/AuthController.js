const { validateUserSignUpBody } = require("../../validators");
const { cryptPassword, comparePassword } = require("../../helpers");
const {
    createNewUser,
    checkExistedUsername,
    checkExistedEmail,
} = require("../../services/user-crud-database");

function AuthController() {
    // [POST] /signup
    this.signup = async (req, res, next) => {
        const { username, email, phoneNumber, password } = req.body;

        // Validate request body
        const { status, error } = await validateUserSignUpBody(req, res, next);
        if (status === "failed") {
            return res.status(400).json({ error: error });
        }

        // Check if username or email is existed
        if (await checkExistedUsername(username)) {
            return res.status(400).json({ message: "Username is existed" });
        }
        if (await checkExistedEmail(email)) {
            return res.status(400).json({ message: "Email is existed" });
        }

        // Encode password and create new user in DB
        cryptPassword(password, async function (err, hashPassword) {
            const newUser = { username, email, phoneNumber, hashPassword };
            await createNewUser(newUser);
        });

        // res.status(400).json({ message: "Sign up failed" });
        res.status(200).json({ message: "Sign up successfully" });
    };

    // [POST] /signin
    this.signin = (req, res, next) => {
        res.send({ message: "Sign in successfully" });
    };
}

module.exports = new AuthController();
