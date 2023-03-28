import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema(
	{
		blogId: {
			type: Number,
			required: true,
			unique: true
		},
		title: {
			type: String,
			trim: true,
			required: true
		},
		content: {
			type: String,
			trim: true,
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
