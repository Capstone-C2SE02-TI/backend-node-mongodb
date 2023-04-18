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
		userWalletAddress: {
			type: String,
			trim: true,
			required: true
		},
		userFullName: {
			type: String,
			trim: true,
			default: ""
		},
		userAvatar: {
			type: String,
			trim: true
		},
		content: {
			type: String,
			trim: true,
			required: true
		},
		children: {
			type: Array,
			default: []
		}
	},
	{ timestamps: true, versionKey: false }
);

const CommentModel = mongoose.model("Comment", CommentSchema);
export default CommentModel;
