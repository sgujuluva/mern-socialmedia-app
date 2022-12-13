import express from "express"
const router = express.Router();
import {registerUser,loginUser} from "../controllers/auth.js"

//http://localhost:8800/api/auth/register
router.post("/register", registerUser)
//http://localhost:8800/api/auth/login
router.post("/login", loginUser)

export default router