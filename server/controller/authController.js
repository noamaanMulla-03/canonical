import jwt from "jsonwebtoken";
import User from "../model/userModel.js";
import dotenv from "dotenv";
dotenv.config();

const maxAge = 1000 * 60 * 60 * 24 * 3;

const createToken = (email, password) => {
	const payload = { email, password };
	const secret = process.env.JWT_KEY;
	console.log(secret);
	const options = { expiresIn: maxAge };

	return jwt.sign(payload, secret, options);
};

const validateSignupData = (email, password) => {
	if (!email || !password)
		return { valid: false, message: "Please fill in all fields" };

	// Add additional validation logic if needed
	return { valid: true };
};

const signup = async (req, res, next) => {
	try {
		const { email, password } = req.body;

		const { valid, message } = validateSignupData(email, password);
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

export { signup };
