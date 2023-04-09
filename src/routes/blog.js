import BlogController from "../controllers/Blog.js";
import express from "express";
const router = express.Router();

router.post("/crawl", BlogController.crawlBlogs);
router.post("/create", BlogController.createNewBlog);

export default router;
