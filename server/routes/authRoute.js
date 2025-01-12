import { Router } from "express";
import { signup, login } from "../controller/AuthController.js";

const authRoute = Router();

authRoute.post("/signup", signup);
authRoute.post("/login", login);

export default authRoute;
