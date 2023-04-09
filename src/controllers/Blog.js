import { crawlBlogs, createNewBlog } from "../services/crudDatabase/blog.js";

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
}

export default new BlogController();
