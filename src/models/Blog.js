import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema(
	{
		type: {
			type: String,
			required: true
		},
		title: {
			type: String,
			trim: true,
			required: true
		},
		description: {
			type: String,
			trim: true
		},
		thumbnail: {
			type: String,
			trim: true
		},
		content: {
			type: String,
			trim: true,
			required: true
		},
		publishDate: {
			type: String,
			required: true
		},
		userId: {
			type: String,
			trim: true,
			required: true
		}
	},
	{ versionKey: false }
);

const BlogModel = mongoose.model("Blog", BlogSchema);
export default BlogModel;
