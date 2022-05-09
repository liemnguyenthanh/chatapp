import express from "express";
import { loginUser } from "../controllers/user.js";
const router = express.Router();

router.get("/login", loginUser);

export default router;