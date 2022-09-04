function SitesController() {
    // [POST] /forgot-password
    this.forgotPassword = (req, res, next) => {
        res.send({ message: "Forgot password successfully" });
    };
}

module.exports = new SitesController();
