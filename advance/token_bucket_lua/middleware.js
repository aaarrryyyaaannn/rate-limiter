const fs = require("fs");
const path = require("path");
const Redis = require("./redis");

const luaScript = fs.readFileSync(path.join(__dirname, "token.lua"), "utf-8");

const capacity = 10;
const refillRate = 2; // tokens per second

const tokenBucket = async (req, res, next) => {
  try {
    const key = `token_bucket:${req.ip}`;

    const result = await Redis.eval(luaScript, 1, key, capacity, refillRate, Math.floor(Date.now() / 1000));

    const allowed = Number(result[0]);
    const tokens = Number(result[1]);
     
    res.setHeader("X-RateLimit-limit", capacity);

    res.setHeader("X-RateLimit-remaining", tokens);

    if (!allowed) {
      return res.status(429).json({
        success: false,
        message: "Rate limit exceeded",
      });
    }

    next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
};

module.exports = tokenBucket;
