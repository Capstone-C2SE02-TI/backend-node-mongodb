import BlogController from "../controllers/Blog.js";
import express from "express";
const router = express.Router();

router.post("/crawl", BlogController.crawlBlogs);
router.post("/create", BlogController.createNewBlog);
router.get("/all", BlogController.getBlogs);
router.get("/detail/:blogId", BlogController.getDetailBlog);

export default router;
