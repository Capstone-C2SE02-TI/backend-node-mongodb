function AuthController() {
    // [POST] /signup
    this.signup = (req, res, next) => {
        // const { username, email, password, passwordConfirm } = req.body;
        res.send({ message: "Sign up successfully" });
    };

    // [POST] /signin
    this.signin = (req, res, next) => {
        // const { username, password } = req.body;
        res.send({ message: "Sign in successfully" });
    };
}

module.exports = new AuthController();
