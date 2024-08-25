import express from "express";
import { createPost, deletePost, getFeedPosts, getPost, likeUnlikePost, replyToPost } from "../controllers/postController.js";
import protectRoute from "../middleware/protectRoute.js";
const router=express.Router();
router.get("/feed", protectRoute, getFeedPosts);
router.get("/:id",getPost)
router.delete("/:id",protectRoute,deletePost)
router.post("/create",protectRoute,createPost)
router.post("/like/:id",protectRoute,likeUnlikePost)
router.post("/reply/:id",protectRoute,replyToPost)







export default router;