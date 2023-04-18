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
		content: content,
		children: []
	};
	const createdComment = await CommentModel.create(newComment);
	return createdComment;
};

export const replyComment = async ({
	blogId,
	userId,
	content,
	parentCommentId
}) => {
	const userInfo = await UserModel.findOne({ _id: userId });
	const comment = await CommentModel.findOne({ _id: parentCommentId });
	if (comment) {
		const newComment = {
			blogId: blogId,
			userId: userId,
			userWalletAddress: userInfo.walletAddress,
			userAvatar: userInfo.avatar,
			userFullName: userInfo.fullName,
			content: content,
			children: null,
			createdAt: new Date()
		};
		return await CommentModel.findOneAndUpdate(
			{ _id: parentCommentId },
			{ children: [...comment.children, newComment] },
			{ new: true }
		);
	} else {
		return false;
	}
};
