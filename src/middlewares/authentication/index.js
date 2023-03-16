import { isAuthed } from "../../services/authentication/index.js";
import dotenv from "dotenv";
dotenv.config();

// Comment tạm thời
export const isAuth = async (req, res, next) => {
	// try {
	// 	if (!(await isAuthed(req, res, next))) {
	// 		return res.status(403).json({
	// 			message: "access-denied unauthorized",
	// 			error: "access-denied unauthorized"
	// 		});
	// 	}

	next();
	// } catch (e) {
	// 	return res.status(403).json({
	// 		message: "access-denied unauthorized",
	// 		error: "access-denied unauthorized"
	// 	});
	// }
};

export const isAdmin = async (req, res, next) => {
	// try {
	// 	if (req.user.role !== "admin") {
	// 		return res.status(403).json({
	// 			message: "access-denied admin-resource",
	// 			error: "access-denied admin-resource"
	// 		});
	// 	}

	next();
	// } catch (e) {
	// 	return res.status(403).json({
	// 		message: "access-denied admin-resource",
	// 		error: "access-denied admin-resource"
	// 	});
	// }
};
