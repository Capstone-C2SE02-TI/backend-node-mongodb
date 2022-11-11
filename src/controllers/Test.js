const mongoose = require("mongoose");
const Test = require("../models/Test");
const { connectDatabase } = require("../configs/connectDatabase");

function TestController() {
	const database = connectDatabase();

	const SharkSchema = new mongoose.Schema({});
	const SharkModel = mongoose.model("Sharks", SharkSchema);
	// const SharkModel = database.model("Sharks", SharkSchema);

	this.test = (req, res, next) => {
		// SharkModel.find({})
		// 	.then((datas) => {
		// 		console.log(datas);
		// 	})
		// 	.catch((error) => {
		// 		console.log(error);
		// 	});
		res.json({ message: "successfully" });
	};
}

module.exports = new TestController();
