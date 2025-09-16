import { Router } from "express";
import {
  login,
  logout,
  register,
  update,
} from "../controller/auth.controller.js";
import protectedRoute from "../middleware/auth.middleware.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", protectedRoute, logout);
router.patch("/update", protectedRoute, update);

export default router;
