import {
	getCommentList,
	createComment
} from "../services/crudDatabase/comment.js";

function CommentController() {
	this.getCommentList = async (req, res, next) => {
		const commentList = await getCommentList();
		commentList
			? res.status(200).json({
					message: "Successfully",
					data: commentList,
					error: null
			  })
			: res.status(400).json({
					message: "Failed",
					data: null,
					error: error
			  });
	};

	this.createComment = async (req, res, next) => {
		const comment = await createComment(req.body);
		comment
			? res.status(200).json({
					message: "Successfully",
					data: comment,
					error: null
			  })
			: res.status(400).json({
					message: "Failed",
					data: null,
					error: error
			  });
	};
}

export default new CommentController();
