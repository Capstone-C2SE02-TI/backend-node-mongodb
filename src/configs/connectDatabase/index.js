const mongoose = require("mongoose");
require("dotenv").config();

let database;
let TestInfo;

const connectDatabase = async () => {
	try {
		mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });
		mongoose.connection.on("error", (error) => console.log(error));
		mongoose.connection.on("open", () => {
			console.log("Connect to database successfully");
			database = mongoose.connection.useDb("TRACKINGINVESTMENT");

			const TestSchema = new mongoose.Schema({
				name: {
					type: String,
				},
			});
			TestInfo = database.model("Test", TestSchema);
			console.log(TestInfo.Test);
			TestInfo.find({})
				.then((datas) => {
					console.log(datas);
				})
				.catch((error) => {
					console.log(error);
				});
		});
	} catch (error) {
		console.log("Connect to database failed with error:", error);
	}
};

console.log(TestInfo);

module.exports = { connectDatabase, database, TestInfo };
