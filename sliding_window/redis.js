require("dotenv").config();

const { createClient } = require("redis");

const redisClient = createClient({
    socket: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT
    }
});

redisClient.on("error", (err) => {
    console.error("Redis Error:", err);
});

redisClient.on("connect", () => {
    console.log("Connected to Memurai 🚀");
});

(async () => {
    await redisClient.connect();
})();

module.exports = redisClient;