const authRouter = require("./auth");
const sitesRouter = require("./sites");

function routing(app) {
    app.use("/auth", authRouter);
    app.use("/", sitesRouter);
}

module.exports = routing;
