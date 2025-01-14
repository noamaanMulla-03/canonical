import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
	const token = req.cookies.jwt;

	if (!token) return res.status(401).json({ error: "Unauthorized" });

	jwt.verify(token, process.env.JWT_KEY, async (error, decoded) => {
		if (error)
			return res.status(403).json({ error: "Token is not valid!" });

		req.userId = decoded.userId;
		next();
	});
};

export { verifyToken };
