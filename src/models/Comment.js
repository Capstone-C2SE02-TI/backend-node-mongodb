import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
	{
		commentId: {
			type: Number,
			required: true,
			unique: true
		},
		content: {
			type: String,
			trim: true,
			required: true,
			unique: true
		},
		userId: {
			type: String,
			trim: true,
			required: true
		}
	},
	{ versionKey: false }
);

const CommentModel = mongoose.model("Comment", CommentSchema);
export default CommentModel;
