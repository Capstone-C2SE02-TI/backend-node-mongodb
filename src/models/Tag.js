const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const TagSchema = new mongoose.Schema({
	_id: { type: ObjectId },
	id: {
		type: Number,
		required: true,
		unique: true,
	},
	name: {
		type: String,
		trim: true,
		required: true,
		unique: true,
	},
});

module.exports = mongoose.model("Tag", TagSchema);
