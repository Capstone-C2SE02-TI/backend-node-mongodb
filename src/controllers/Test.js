const mongoose = require("mongoose");
// const Test = require("../models/Test");
const { connectDatabase } = require("../configs/connectDatabase");

function ForgotPasswordController() {
	// Test get datas
	const database = connectDatabase();
	const SharkSchema = new mongoose.Schema({});
	const SharkModel = database.model("Sharks", SharkSchema);

	this.getList = (req, res, next) => {
		SharkModel.find({})
			.then((datas) => {
				console.log(datas);
			})
			.catch((error) => {
				console.log(error);
			});
	};
}

module.exports = ForgotPasswordController();
