import express from "express"
const router = express.Router();
import {getAllPosts,createPost,updatePost,deletePost} from "../controllers/posts.js"

//http://localhost:8800/api/posts
router.get("/", getAllPosts)
//create a post
//http://localhost:8800/api/posts/create
router.post("/create", createPost)
//update a post
//http://localhost:8800/api/posts/:id (post id which needs to be updated)
router.put("/:id", updatePost)
//delete a post
//http://localhost:8800/api/posts/delete:/id
router.delete("/delete/:id", deletePost)
//like a post
//get a post
//getall post of the user followings (timeline)



export default router