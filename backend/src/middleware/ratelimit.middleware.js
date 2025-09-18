import rateLimit from "express-rate-limit";

export const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 50,
  message: "To many request, please try again latter",
  standardHeaders: "draft-8",
  legacyHeaders: false,
});
