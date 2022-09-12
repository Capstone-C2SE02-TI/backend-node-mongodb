const authRouter = require("./auth");
const forgotPasswordRouter = require("./forgotPassword");
const userRouter = require("./user");
const sitesRouter = require("./sites");

function routing(app) {
    app.use("/auth", authRouter);
    app.use("/forgot-password", forgotPasswordRouter);
    app.use("/user", userRouter);
    app.use("/", sitesRouter);
}

module.exports = routing;
