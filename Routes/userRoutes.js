import express from "express";
import { followUnfollowerUser, getUserProfile, loginUser, logoutUser, signupUser, updateUser } from "../controllers/userController.js";
import protectRoute from "../middleware/protectRoute.js"
// Rest of your code that uses the signupUser function


const router=express.Router();
router.get("/profile/:username",getUserProfile)

router.post("/signup",signupUser)
router.post("/login",loginUser)
router.post("/logout",logoutUser)
router.post("/follow/:id",protectRoute,followUnfollowerUser)
router.post("/update/:id",protectRoute,updateUser)


export default router;