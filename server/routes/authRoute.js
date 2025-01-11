import { Router } from "express";
import { signup } from "../controller/AuthController.js";

const authRoute = Router();

authRoute.post("/signup", signup);

export default authRoute;
