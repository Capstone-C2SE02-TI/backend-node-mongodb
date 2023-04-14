import { DEFAULT_USER_AVATARS } from "../../constants/index.js";
import { CommentModel, UserModel } from "../../models/index.js";

export const getCommentList = async (blogId) => {
	let commentList = await CommentModel.find({ blogId: blogId });
	return commentList;
};

export const createComment = async ({ blogId, userId, content }) => {
	const userInfo = await UserModel.findOne({ _id: userId });
	const newComment = {
		blogId: blogId,
		userId: userId,
		userWalletAddress: userInfo.walletAddress,
		userAvatar: userInfo.avatar,
		userFullName: userInfo.fullName,
		content: content
	};
	const createdComment = await CommentModel.create(newComment);
	return createdComment;
};
