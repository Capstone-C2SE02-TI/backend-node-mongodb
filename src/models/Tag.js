import mongoose from "mongoose";

const TagSchema = new mongoose.Schema(
	{
		id: {
			type: Number,
			required: true,
			unique: true
		},
		name: {
			type: String,
			trim: true,
			required: true,
			unique: true
		}
	},
	{ versionKey: false }
);

const TagModel = mongoose.model("Tag", TagSchema);
export default TagModel;
