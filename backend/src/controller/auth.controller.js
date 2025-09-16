import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import prisma from "../lib/prisma.js";

export const register = async (req, res) => {
  try {
  } catch (error) {
    console.log("Error in register controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  try {
  } catch (error) {
    console.log("Error in login controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const update = async (req, res) => {
  try {
  } catch (error) {
    console.log("Error in update controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const logout = async (req, res) => {
  try {
  } catch (error) {
    console.log("Error in logout controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
