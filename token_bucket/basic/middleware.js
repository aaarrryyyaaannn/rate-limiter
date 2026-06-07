const Redis = require('ioredis');
const redis = new Redis();

const capacity = 10; // Maximum tokens in the bucket
const refillRate = 1; // Tokens added per second

async function tokenBucket(req, res, next) {
    const userId = req.ip; // Use IP address as user identifier
    const key = `token_bucket:${userId}`;

    const now = Date.now()/1000; // Current time in seconds
    let data = await redis.get(key);
    let tokens = capacity;
    let lastRefill = now;

    if (data) {
        data = JSON.parse(data);
        tokens = data.tokens;
        lastRefill = data.lastRefill;
    }

    const timePassed = now - lastRefill;
    const newTokens = timePassed * refillRate;

    tokens = Math.min(capacity, tokens + newTokens);

    if (tokens >= 1) {
        tokens -= 1;

        await redis.set(key, JSON.stringify({ tokens, lastRefill: now }));
        console.log(`Tokens left for ${userId}: ${tokens}`);
        next();
    } else {
        res.status(429).send('Too Many Requests');
    }   
}

module.exports = tokenBucket;