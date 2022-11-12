const AdminModel = require("../models/Admin");

function TestController() {
	this.test = (req, res, next) => {
		AdminModel.find({})
			.then((datas) => {
				console.log(datas);
			})
			.catch((error) => {
				console.log(error);
			});

		res.json({ message: "successfully" });
	};
}

module.exports = new TestController();
