import axios from "axios";
import { BlogModel } from "../../models/index.js";
import { convertUnixTimestampToNumber } from "../../helpers/index.js";

export const crawlBlogs = async () => {
	const blogAPIs = [];

	const blogs = blogAPIs.map(async (blogAPI) => {
		const blogData = await axios.get(blogAPI.url, {
			headers: {
				"Access-Control-Allow-Origin": "*",
				"Content-Type": "application/json"
			}
		});
		const { title, description, content, image, publishDate } =
			blogData.data.pageProps.postDetail;

		const newBlog = {
			type: blogAPI.type,
			title: title,
			description: description,
			thumbnail: image.light || image.dark,
			publishDate: convertUnixTimestampToNumber(publishDate),
			content: content.replace("\n", "").replace("\t", "").replace("\\", ""),
			userId: "1"
		};
		return await BlogModel.create(newBlog);
	});

	return blogs;
};

export const createNewBlog = async (blogAPI, type) => {
	const blogData = await axios.get(blogAPI, {
		headers: {
			"Access-Control-Allow-Origin": "*",
			"Content-Type": "application/json"
		}
	});

	const { title, description, content, image, publishDate } =
		blogData.data.pageProps.postDetail;

	const newBlog = {
		type: type,
		title: title,
		description: description,
		thumbnail: image.light || image.dark,
		publishDate: convertUnixTimestampToNumber(publishDate),
		content: content.replace("\n", "").replace("\t", "").replace("\\", ""),
		userId: "1"
	};

	const createdBlog = await BlogModel.create(newBlog);
	return createdBlog;
};
