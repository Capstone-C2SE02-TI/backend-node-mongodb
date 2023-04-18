import express from "express";
const router = express.Router();
import CommentController from "../controllers/Comment.js";

router.get("/list", CommentController.getCommentList);
router.post("/create", CommentController.createComment);
router.post("/reply", CommentController.replyComment);

export default router;
