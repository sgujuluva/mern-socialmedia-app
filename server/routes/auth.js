import express from "express"
const router = express.Router();
import {registerUser} from "../controllers/auth.js"

//http://localhost:8800/api/auth/register
router.post("/register", registerUser)

export default router