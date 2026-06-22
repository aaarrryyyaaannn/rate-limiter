const redis = require("./redis");
const fs = require("fs");
const path = require("path");

const luaScript = fs.readFileSync(
  path.join(__dirname, "leaky.lua"),
  "utf8"
);

const CAPACITY = 10;
const LEAK_RATE = 2;

const leakyBucket = async (req, res, next) => {
  try {
    const key = `leaky_bucket:${req.ip}`;

    const result = await redis.eval(
      luaScript,
      1,
      key,
      CAPACITY,
      LEAK_RATE,
      Math.floor(Date.now() / 1000)
    );

    const allowed = Number(result[0]);
    const water = Number(result[1]);

    res.setHeader(
      "X-LeakyBucket-Limit",
      CAPACITY
    );

    res.setHeader(
      "X-LeakyBucket-Water",
      water
    );

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

module.exports = leakyBucket;