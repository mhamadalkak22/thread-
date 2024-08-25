
import User from "../models/usermodels.js";
import Post from "../models/postModel.js";
import mongoose from "mongoose";

const createPost=async(req,res)=>{
    try {
        const {postedBy,text,img}=req.body

     if(!postedBy||!text){
        return res.status(400).json({message:"PostBY and text filed are required"});
     }   

     const user=await User.findById(postedBy);
     if(!user){
         return res.status(404).json({message:"User not found"});
     }
    
		if (user._id.toString() !== req.user._id.toString()) {
			return res.status(401).json({ error: "Unauthorized to create post" });
		}
        const maxLength = 500;
		if (text.length > maxLength) {
			return res.status(400).json({ error: `Text must be less than ${maxLength} characters` });
		}
        const newPost = new Post({ postedBy, text, img });
		await newPost.save();
        res.status(201).json({message:"post create succesfully",newPost});    



    } catch (err) {
        res.status(500).json({message:err.message})
    console.log(err)
    }
}
const getPost=async(req,res)=>{
    try {
        const post=await Post.findById(req.params.id)

     if(!post){
        return res.status(404).json({message:"Page not found"})
     }   
     res.status(200).json({post})
        
    } catch (err) {
        res.status(500).json({message:err.message})
        
    }

}

const deletePost=async(req,res)=>{
    try {
        const post=await Post.findById(req.params.id)
        if(!post){
            res.status(404).json({message:"post not found"})
        }
        
		if (post.postedBy.toString() !== req.user._id.toString()) {
			return res.status(401).json({ error: "Unauthorized to delete post" });
		}
        await Post.findByIdAndDelete(req.params.id)
        res.status(200).json({ message: "Post deleted successfully" });
    } catch (err) {
        res.status(500).json({message:err.message})
    }
}
const likeUnlikePost=async(req,res)=>{
    try {
        const {id:postId}=req.params;
        const userId=req.user._id;
        const post= await Post.findById(postId)
        if(!post){
            res.status(404).json({message:err.message})
        }
        const userLikePost=post.likes.includes(userId);

      if(userLikePost){
        await Post.updateOne({ _id: postId }, { $pull: { likes: userId } });
		res.status(200).json({ message: "Post unliked successfully" });

      } else{
        post.likes.push(userId);
        await post.save();
        res.status(200).json({ message: "Post liked successfully" });
      } 
        
    } catch (err) {
        res.status(500).json({message:err.message})
    }
}

const replyToPost=async(req,res)=>{
    try {
        
		const { text } = req.body;
		const postId = req.params.id;
		const userId = req.user._id;
		const userProfilePic = req.user.profilePic;
		const username = req.user.username;
       if(!text){
        res.status(400).json({message:"text is required"})
       } 
       const post=await Post.findById(postId);
       if(!Post){
        res.status(404).json({message:"post not found"})
       }
       const reply = { userId, text, userProfilePic, username };
       post.replies.push(reply);
		await post.save();
        res.status(200).json({message:"reply send it sucess",post});
    } catch (err) {
        res.status(500).json({message:err.message})
    }
}
const getFeedPosts = async (req, res) => {
	try {
		const userId = req.user._id;
		const user = await User.findById(userId);
		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		const following = user.following;
    
	const feedPosts = await Post.find({ postedBy: { $in: following } }).sort({ createdAt: -1 });

		res.status(200).json(feedPosts);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};
export {createPost,getPost,deletePost,likeUnlikePost,replyToPost,getFeedPosts};