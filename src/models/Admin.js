const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const AdminSchema = new mongoose.Schema(
	{
		_id: { type: Number },
		id: {
			type: Number,
			required: true,
			unique: true,
		},
		email: {
			type: String,
			trim: true,
			required: true,
			maxlength: 32,
			unique: true,
		},
		username: {
			type: String,
			trim: true,
			required: true,
			unique: true,
			minLength: 5,
			maxlength: 16,
		},
		password: {
			type: String,
			trim: true,
			required: true,
			minLength: 8,
			maxlength: 16,
		},
	},
	{ timestamps: true },
);

module.exports = mongoose.model("Admin", AdminSchema);
