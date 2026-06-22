const redis = require("./redis");

const CAPACITY = 10;
const LEAK_RATE = 2; // requests per second

const leakyBucket = async (req, res, next) => {
  try {
    const key = `leaky:${req.ip}`;

    const data = await redis.hgetall(key);

    let water = Number(data.water || 0);
    let lastLeakTime = Number(
      data.lastLeakTime || Math.floor(Date.now() / 1000)
    );

    const now = Math.floor(Date.now() / 1000);

    // Calculate leaked requests
    const elapsed = now - lastLeakTime;
    const leaked = elapsed * LEAK_RATE;

    water = Math.max(0, water - leaked);

    // Add current request
    water += 1;

    if (water > CAPACITY) {
      await redis.hset(key, {
        water,
        lastLeakTime: now,
      });

      return res.status(429).json({
        success: false,
        message: "Rate limit exceeded",
      });
    }

    await redis.hset(key, {
      water,
      lastLeakTime: now,
    });

    // Cleanup idle buckets
    await redis.expire(
      key,
      Math.ceil(CAPACITY / LEAK_RATE) + 60
    );

    next();
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports = leakyBucket;