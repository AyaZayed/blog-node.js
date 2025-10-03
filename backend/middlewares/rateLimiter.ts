import rateLimit from "express-rate-limit";

const limiter = rateLimit({
   windowMs: 15 * 60 * 1000,
   limit: 5,

   standardHeaders: "draft-8",
   legacyHeaders: false,
   handler: (req, res, next) => {
      res.status(429).json({
         status: "failure",
         message: "Too many requests, please try again later",
      });
   },
});

export default limiter;
