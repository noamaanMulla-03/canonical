import { Router } from "express";
import {
	signup,
	login,
	getUserInfo,
	updateProfile,
	updateProfileImage,
	removeProfileImage,
} from "../controller/authController.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import multer from "multer";

const authRoute = Router();
const upload = multer({ dest: "upload/profile-picture" });

authRoute.post("/signup", signup);
authRoute.post("/login", login);
authRoute.get("/user-info", verifyToken, getUserInfo);
authRoute.post("/update-profile", verifyToken, updateProfile);
authRoute.post(
	"/update-profile-image",
	verifyToken,
	upload.single("profile-image"),
	updateProfileImage
);
authRoute.delete("/remove-profile-image", verifyToken, removeProfileImage);

export default authRoute;
