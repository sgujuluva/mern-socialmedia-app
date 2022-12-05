import express from "express"
const router = express.Router();
import {getAllUsers} from "../controllers/users.js"

//http://localhost:8800/api/users
router.get("/", getAllUsers)

export default router