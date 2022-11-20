const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const AdminSchema = new mongoose.Schema({
	_id: { type: ObjectId },
	id: {
		type: Number,
		required: true,
		unique: true
	},
	email: {
		type: String,
		trim: true,
		required: true,
		unique: true,
		minlength: 16,
		maxlength: 40
	},
	username: {
		type: String,
		trim: true,
		required: true,
		unique: true,
		minLength: 5,
		maxlength: 16
	},
	password: {
		type: String,
		trim: true,
		required: true
	}
});

module.exports = mongoose.model("Admin", AdminSchema);
