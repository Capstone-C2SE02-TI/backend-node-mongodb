const authRouter = require("./auth");
const forgotPasswordRouter = require("./forgotPassword");
const sitesRouter = require("./sites");

function routing(app) {
    app.use("/auth", authRouter);
    app.use("/forgot-password", forgotPasswordRouter);
    app.use("/", sitesRouter);
}

module.exports = routing;
