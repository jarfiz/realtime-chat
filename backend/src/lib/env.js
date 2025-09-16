import dotenv from "dotenv";
dotenv.config();

const env = {
  PORT: process.env.PORT,
  NODE_END: process.env.NODE_END,
  JWT_SECRET: process.env.JWT_SECRET,
};

export default env;
