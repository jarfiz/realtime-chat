import { Router } from "express";
import {
  login,
  logout,
  register,
  update,
} from "../controller/auth.controller.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.patch("/update", update);

export default router;
