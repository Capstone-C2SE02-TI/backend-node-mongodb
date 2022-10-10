const mongoose = require("mongoose");
require("dotenv").config();

const MONGODB_URI = process.env.MONGODB_URI;

const connectDatabase = () => {
	let database;
	try {
		mongoose.connect(MONGODB_URI, { useNewUrlParser: true });
		mongoose.connection.on("error", (error) => {
			throw new Error(error);
		});
		mongoose.connection.on("open", () => {
			database = mongoose.connection.useDb("TRACKINGINVESTMENT");
			console.log("Connect to database successfully");

			// Test get datas
			const SharkSchema = new mongoose.Schema({});
			const SharkModel = database.model("Sharks", SharkSchema);

			SharkModel.find({})
				.then((datas) => {
					console.log(datas);
				})
				.catch((error) => {
					console.log(error);
				});
		});

		return database;
	} catch (error) {
		console.log("Connect to database failed with error:", error);
		return null;
	}
};

module.exports = { connectDatabase };
