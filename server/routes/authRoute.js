import { Router } from "express";
import {
	signup,
	login,
	getUserInfo,
	updateProfile,
} from "../controller/AuthController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const authRoute = Router();

authRoute.post("/signup", signup);
authRoute.post("/login", login);
authRoute.get("/user-info", verifyToken, getUserInfo);
authRoute.post("/update-profile", verifyToken, updateProfile);

export default authRoute;
