import authRouter from "./auth.js";
import forgotPasswordRouter from "./forgotPassword.js";
import userRouter from "./user.js";
import displayRouter from "./display.js";
import adminRouter from "./admin.js";

function routing(app) {
	/* User routes */
	app.use("/auth", authRouter);
	app.use("/forgot-password", forgotPasswordRouter);
	app.use("/display", displayRouter);
	app.use("/user", userRouter);

	/* Admin routes */
	app.use("/admin", adminRouter);

	/* Notfound routes */
	app.use("*", (req, res, next) => {
		res.status(404).json({
			message: "not-found",
			error: "not-found"
		});
	});
}

export default routing;
