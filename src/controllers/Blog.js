import {
	crawlBlogs,
	createNewBlog,
	getBlogs,
	getBlogsByType,
	getDetailBlog
} from "../services/crudDatabase/blog.js";

function BlogController() {
	this.crawlBlogs = async (req, res, next) => {
		const createdBlogs = await crawlBlogs();

		createdBlogs
			? res.status(200).json({
					message: "successfully",
					data: createdBlogs,
					error: null
			  })
			: res.status(400).json({
					message: "failed",
					data: null,
					error: null
			  });
	};

	this.createNewBlog = async (req, res, next) => {
		const { blogAPI, type } = req.body;
		const createdBlog = await createNewBlog(blogAPI, type);

		createdBlog
			? res.status(200).json({
					message: "successfully",
					data: createdBlog,
					error: null
			  })
			: res.status(400).json({
					message: "failed",
					data: null,
					error: null
			  });
	};

	this.getBlogs = async (req, res, next) => {
		let blogs = [];
		const type = req.query.type;

		if (!type) blogs = await getBlogs();
		else blogs = await getBlogsByType(type);

		blogs
			? res.status(200).json({
					message: "successfully",
					data: blogs,
					error: null
			  })
			: res.status(400).json({
					message: "failed",
					data: null,
					error: null
			  });
	};

	this.getDetailBlog = async (req, res, next) => {
		const blogId = req.params.blogId;
		const blog = await getDetailBlog(blogId);

		blog.message === "success"
			? res.status(200).json({
					message: blog.message,
					data: blog.data,
					error: blog.error
			  })
			: res.status(400).json({
					message: blog.message,
					data: blog.data,
					error: blog.error
			  });
	};
}

export default new BlogController();
