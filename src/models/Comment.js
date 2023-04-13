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
		userFullName: {
			type: String,
			trim: true,
			default: ""
		},
		userAvatar: {
			type: String,
			trim: true,
			default:
				"https://res.cloudinary.com/dhzbsq7fj/image/upload/v1643101647/avatardefault_92824_aifry9.png"
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
