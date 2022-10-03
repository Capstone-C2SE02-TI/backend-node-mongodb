const Test = require("../models/Test");
const { TestInfo } = require("../configs/connectDatabase");

const getList = (req, res, next) => {
	console.log(TestInfo);

	TestInfo.find({})
	    .then((datas) => {
	        console.log(datas);
	        res.json(datas)
	    })
	    .catch((error) => {
	        console.log(error);
	        res.json({ error: error })
	    });
};

module.exports = { getList };
