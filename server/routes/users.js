import express from "express"
const router = express.Router();
import {getAllUsers,updateUser,deleteUser,getUser,followUser,unfollowUser} from "../controllers/users.js"

//http://localhost:8800/api/users
router.get("/", getAllUsers)
//update user
//http://localhost:8800/api/users/:id
router.put("/:id",updateUser)
//delete user
//http://localhost:8800/api/users/:id
router.delete("/:id",deleteUser)
// get a user
//http://localhost:8800/api/users/:id
router.get("/:id",getUser)
//follow a user
//http://localhost:8800/api/users/:id/follow
router.put("/:id/follow",followUser)   /* ---put--- because ae are update another user name in this user */
//unfollow a user
//http://localhost:8800/api/users/:id/unfollow
router.put("/:id/unfollow",unfollowUser)

export default router