import Post from "../models/Post.js";
import User from "../models/User.js"
import bcrypt from "bcrypt";

export const getAllPosts = async (req, res) => {
  res.send("this is our Post page");
};

export const createPost = async (req, res) => {
  const newPost = new Post(req.body); // get the post by the user from frontend
  try {
    const savePost = await newPost.save();
    return res.status(200).json(savePost);
  } catch (error) {
    res.send("Some errror occured on Post");
  }
};

export const updatePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id); // getting the post id which needs to be updated
        //check if the user is same
        if (post.userId === req.body.userId) {
            //update the post
          await post.updateOne({ $set: req.body });
          res.status(200).json("the post has been updated");
        } else {
          res.status(403).json("you can update only your post");
        }
      } catch (err) {
        res.status(500).json(err);
      }
 
};

export const deletePost = async (req, res) => {
    try {
        const getPostToBeDeleted = await Post.findById(req.params.id); // getting the post id which needs to be deleted
      
      //check if the user id is same from req.body and post's userId
      if (getPostToBeDeleted.userId === req.body.userId) {
        //delete the post
       await getPostToBeDeleted.deleteOne();
     
        return res.status(200).json("the post has been deleted");
      } else {
        return res.status(403).json("You can delete only your post");
      } 
    } catch (error) {
      res.send(error);
    } 
};

/* like /dislike a post */
export const likePost = async (req,res) => {
  try {
        //getting the post id which is to be liked
    const post = await Post.findById(req.params.id);
//check if the post belongs to the userid
    if(!post.likes.includes(req.body.userId)){
      await post.updateOne({$push: {likes:req.body.userId}})
      return res.status(200).json("post has been liked")
    }else{
      await post.updateOne({$pull: {likes:req.body.userId}})
      return res.status(200).json("post has been disliked")
    }

  } catch (error) {
    return res.send(error)
  }
}