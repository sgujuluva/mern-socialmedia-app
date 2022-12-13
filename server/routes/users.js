import express from "express"
const router = express.Router();
import {getAllUsers,updateUser} from "../controllers/users.js"

//http://localhost:8800/api/users
router.get("/", getAllUsers)
//update user
//http://localhost:8800/api/users/:id
router.put("/:id",updateUser)
//delete user
// get a user
//follow a user
//unfollow a user

export default router