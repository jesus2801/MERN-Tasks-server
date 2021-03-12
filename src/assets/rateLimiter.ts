import rateLimit from "express-rate-limit";

export const limiter = rateLimit({
  windowMs: 30 * 60 * 1000, // 30 minutes
  max: 8 // limit each IP to 8 requests per windowMs
});

export const Signuplimiter = rateLimit({
  windowMs: 45 * 60 * 1000, // 30 minutes
  max: 3 // limit each IP to 8 requests per windowMs
});