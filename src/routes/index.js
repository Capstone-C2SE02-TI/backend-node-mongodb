const authRoute = require("./auth");
const sitesRoute = require("./sites");

function routing(app) {
    app.use("/auth", authRoute);
    app.use("/", sitesRoute);
}

module.exports = routing;
