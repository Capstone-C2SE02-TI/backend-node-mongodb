const authRouter = require("./auth");
const userRouter = require("./user");
const sitesRouter = require("./sites");

function routing(app) {
    app.use("/auth", authRouter);
    app.use("/user", userRouter);
    app.use("/", sitesRouter);
}

module.exports = routing;
