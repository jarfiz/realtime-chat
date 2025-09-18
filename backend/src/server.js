import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import env from "./lib/env.js";
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import { limiter } from "./middleware/ratelimit.middleware.js";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(limiter);

app.get("/", (_, res) => {
  res.status(200).json({ message: "Api is running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

app.listen(env.PORT, () => console.log(`Server running on port ${env.PORT}`));
