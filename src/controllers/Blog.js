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
					message: "Successfully",
					data: createdBlogs,
					error: null
			  })
			: res.status(400).json({
					message: "Failed",
					data: null,
					error: null
			  });
	};

	this.createNewBlog = async (req, res, next) => {
		const { blogAPI, type } = req.body;
		const createdBlog = await createNewBlog(blogAPI, type);

		createdBlog
			? res.status(200).json({
					message: "Successfully",
					data: createdBlog,
					error: null
			  })
			: res.status(400).json({
					message: "Failed",
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
					message: "Successfully",
					data: blogs,
					error: null
			  })
			: res.status(400).json({
					message: "Failed",
					data: null,
					error: null
			  });
	};

	this.getDetailBlog = async (req, res, next) => {
		const blogId = req.params.blogId;
		const blog = await getDetailBlog(blogId);

		blog
			? res.status(200).json({
					message: "Successfully",
					data: blog,
					error: null
			  })
			: res.status(400).json({
					message: "Failed",
					data: null,
					error: null
			  });
	};
}

export default new BlogController();
