import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
	{
		blogId: {
			type: String,
			required: true
		},
		userId: {
			type: String,
			trim: true,
			required: true
		},
		content: {
			type: String,
			trim: true,
			required: true
		}
	},
	{ timestamps: true, versionKey: false }
);

const CommentModel = mongoose.model("Comment", CommentSchema);
export default CommentModel;
