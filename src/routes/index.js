import authRouter from "./auth.js";
import userRouter from "./user.js";
import displayRouter from "./display.js";

function routing(app) {
	app.use("/auth", authRouter);
	app.use("/display", displayRouter);
	app.use("/user", userRouter);
	app.use("*", (req, res, next) => {
		res.status(404).json({
			message: "not-found",
			error: "not-found"
		});
	});
}

export default routing;
