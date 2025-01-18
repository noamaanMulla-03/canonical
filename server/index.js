import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoute from "./routes/authRoute.js";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const MONGO_URI = process.env.MONGO_URI;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(
	cors({
		origin: [process.env.CLIENT_URL],
		methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
		credentials: true,
	})
);

app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRoute);
app.use(
	"upload/profile-picture",
	express.static(path.join(__dirname, "./upload/profile-picture"))
);

app.listen(PORT, () => {
	console.log(`[+] Server is running on port: ${PORT}`);
});

mongoose
	.connect(MONGO_URI)
	.then(() => {
		console.log("[+] Connected to MongoDB");
	})
	.catch((err) => {
		console.log("[-] Failed to connect to MongoDB", err);
	});
