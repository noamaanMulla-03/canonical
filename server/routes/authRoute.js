import { Router } from "express";
import {
	signup,
	login,
	getUserInfo,
	updateProfile,
	updateProfileImage,
} from "../controller/AuthController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const authRoute = Router();

authRoute.post("/signup", signup);
authRoute.post("/login", login);
authRoute.get("/user-info", verifyToken, getUserInfo);
authRoute.post("/update-profile", verifyToken, updateProfile);
authRoute.post("/update-profile-image", verifyToken, updateProfileImage);

export default authRoute;
