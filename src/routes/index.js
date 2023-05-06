import authRouter from "./auth.js";
import userRouter from "./user.js";
import displayRouter from "./display.js";
import blogRouter from "./blog.js";
import commentRouter from "./comment.js";
import tradingRouter from "./trading.js"

function routing(app) {
	app.use("/auth", authRouter);
	app.use("/display", displayRouter);
	app.use("/user", userRouter);
	app.use("/blog", blogRouter);
	app.use("/comment", commentRouter);
	app.use("/trading", tradingRouter);
	app.use("*", (req, res, next) => {
		res.status(404).json({
			message: "not-found",
			error: "not-found"
		});
	});
}

export default routing;
