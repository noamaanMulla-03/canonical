import jwt from "jsonwebtoken";
import { compare } from "bcrypt";
import User from "../model/userModel.js";
import dotenv from "dotenv";
dotenv.config();

const maxAge = 1000 * 60 * 60 * 24 * 3;

const createToken = (email, userId) => {
	const payload = { email, userId };
	const secret = process.env.JWT_KEY;
	const options = { expiresIn: maxAge };

	return jwt.sign(payload, secret, options);
};

const validateData = (email, password) => {
	if (!email || !password)
		return { valid: false, message: "Please fill in all fields" };

	// Add additional validation logic if needed
	return { valid: true };
};

const signup = async (req, res, next) => {
	try {
		const { email, password } = req.body;

		const { valid, message } = validateData(email, password);
		if (!valid) return res.status(400).json({ error: message });

		const user = await User.create({
			email,
			password,
		});

		const cookieOptions = {
			maxAge: 24 * 60 * 60 * 1000, // Example: 1 day in milliseconds
			secure: true,
			sameSite: "none",
		};

		res.cookie("jwt", createToken(email, user.id), cookieOptions);

		return res.status(201).json({
			user: {
				id: user.id,
				email: user.email,
				profileSetup: user.profileSetup,
			},
		});
	} catch (error) {
		console.log(`[-] Error in signup: ${error.message}`);
		return res.status(500).json({ error: "Internal server error" });
	}
};

const login = async (req, res, next) => {
	try {
		const { email, password } = req.body;

		const { valid, message } = validateData(email, password);
		if (!valid) return res.status(400).json({ error: message });

		const user = await User.findOne({ email });
		if (!user) return res.status(404).json({ error: "User not found" });

		const isMatch = await compare(password, user.password);
		if (!isMatch)
			return res.status(400).json({ error: "Invalid credentials" });

		const cookieOptions = {
			maxAge: 24 * 60 * 60 * 1000, // Example: 1 day in milliseconds
			secure: true,
			sameSite: "none",
		};

		res.cookie("jwt", createToken(email, user.id), cookieOptions);

		return res.status(200).json({
			user: {
				id: user.id,
				email: user.email,
				firstName: user.firstName,
				lastName: user.lastName,
				image: user.image,
				colorCode: user.colorCode,
				profileSetup: user.profileSetup,
			},
		});
	} catch (error) {
		console.log(`[-] Error in signup: ${error.message}`);
		return res.status(500).json({ error: "Internal server error" });
	}
};

const getUserInfo = async (req, res, next) => {
	try {
		const user = await User.findById(req.userId);

		if (!user) return res.status(404).json({ error: "User not found" });

		return res.status(200).json({
			id: user.id,
			email: user.email,
			firstName: user.firstName,
			lastName: user.lastName,
			image: user.image,
			colorCode: user.colorCode,
			profileSetup: user.profileSetup,
		});
	} catch (error) {
		console.log(`[-] Error in getUserInfo: ${error.message}`);
		return res.status(500).json({ error: "Internal server error" });
	}
};

const updateProfile = async (req, res, next) => {
	try {
		const { userId } = req;
		const user = await User.findById(userId);

		if (!user) return res.status(404).json({ error: "User not found" });

		const { firstName, lastName, image, colorCode } = req.body;

		if (!firstName || !lastName || colorCode === undefined)
			return res.status(400).json({ error: "Please fill in all fields" });

		const updatedUser = await User.findByIdAndUpdate(
			userId,
			{
				firstName,
				lastName,
				image,
				colorCode,
				profileSetup: true,
			},
			{ new: true, runValidators: true }
		);

		return res.status(200).json({
			id: updatedUser.id,
			email: updatedUser.email,
			firstName: updatedUser.firstName,
			lastName: updatedUser.lastName,
			image: updatedUser.image,
			colorCode: updatedUser.colorCode,
			profileSetup: updatedUser.profileSetup,
		});
	} catch (error) {
		console.log(`[-] Error in updateProfile: ${error.message}`);
		return res.status(500).json({ error: "Internal server error" });
	}
};

const updateProfileImage = async (req, res, next) => {
	try {
		const { userId } = req;
		const user = await User.findById(userId);

		console.log("REACHED HERE: ", user);

		if (!user) return res.status(404).json({ error: "User not found" });
	} catch (error) {
		console.log(`[-] Error in updateProfileImage: ${error.message}`);
		return res.status(500).json({ error: "Internal server error" });
	}
};

export { signup, login, getUserInfo, updateProfile, updateProfileImage };
