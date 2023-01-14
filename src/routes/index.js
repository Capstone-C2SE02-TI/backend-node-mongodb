const authRouter = require("./auth");
const forgotPasswordRouter = require("./forgotPassword");
const userRouter = require("./user");
const displayRouter = require("./display");
const adminRouter = require("./admin");

function routing(app) {
	/* User routes */
	app.use("/auth", authRouter);
	app.use("/forgot-password", forgotPasswordRouter);
	app.use("/display", displayRouter);
	app.use("/user", userRouter);

	/* Admin routes */
	app.use("/admin", adminRouter);

	/* Notfound routes */
	app.use("*", (req, res) => {
		res.status(404).json({
			message: "not-found",
			error: "not-found"
		});
	});
}

module.exports = routing;
