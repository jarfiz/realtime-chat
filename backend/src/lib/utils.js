import jwt from "jsonwebtoken";
import env from "./env.js";

export const generateToken = async (id, res) => {
  const token = jwt.sign({ id }, env.JWT_SECRET, { expiresIn: "7d" });

  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: env.NODE_ENV !== "development", // in dev = false, prod = true
  });
};
