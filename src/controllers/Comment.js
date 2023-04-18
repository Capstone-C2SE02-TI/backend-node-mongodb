import {
	getCommentList,
	createComment,
	replyComment
} from "../services/crudDatabase/comment.js";

function CommentController() {
	this.getCommentList = async (req, res, next) => {
		const blogId = req.query.blogId;
		const commentList = await getCommentList(blogId);
		commentList
			? res.status(200).json({
					message: "successfully",
					data: commentList,
					error: null
			  })
			: res.status(400).json({
					message: "failed",
					data: null,
					error: error
			  });
	};

	this.createComment = async (req, res, next) => {
		const comment = await createComment(req.body);
		comment
			? res.status(200).json({
					message: "successfully",
					data: comment,
					error: null
			  })
			: res.status(400).json({
					message: "failed",
					data: null,
					error: error
			  });
	};

	this.replyComment = async (req, res, next) => {
		const comment = await replyComment(req.body);
		comment
			? res.status(200).json({
					message: "successfully",
					data: comment,
					error: null
			  })
			: res.status(400).json({
					message: "failed",
					data: null,
					error: error
			  });
	};
}

export default new CommentController();
