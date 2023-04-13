import CommentModel from "../../models/Comment.js";

export const getCommentList = async () => {
	let commentList = await CommentModel.find({});
	return commentList;
};

export const createComment = async ({ blogId, userId, content }) => {
	const newComment = {
		blogId: blogId,
		userId: userId,
		content: content
	};
	const createdComment = await CommentModel.create(newComment);
	return createdComment;
};
