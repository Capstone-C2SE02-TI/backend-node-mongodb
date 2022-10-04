const mongoose = require("mongoose");
require("dotenv").config();

const MONGODB_URI = process.env.MONGODB_URI;
let database;

const connectDatabase = async () => {
	try {
		mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

		mongoose.connection.on("error", (error) => {
			throw new Error(error);
		});

		mongoose.connection.on("open", () => {
			console.log("Connect to database successfully");
			database = mongoose.connection.useDb("TRACKINGINVESTMENT");
		});

		return database;
	} catch (error) {
		console.log("Connect to database failed with error:", error);
		return null;
	}
};

module.exports = connectDatabase;
