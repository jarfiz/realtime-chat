import jwt from "jsonwebtoken";
import env from "../lib/env.js";
import prisma from "../lib/prisma.js";

const protectedRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      res.status(400).json({ message: "Unauthorized - no token provided" });
    }

    const decoded = jwt.decode(token, env.JWT_SECRET);
    const user = await prisma.user.findUnique({ where: { id: decoded.id } });
    req.user = user;

    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
    next();
  }
};

export default protectedRoute;
