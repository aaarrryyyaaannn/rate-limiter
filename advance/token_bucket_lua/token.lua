local key = KEYS[1]

local capacity = tonumber(ARGV[1])
local refill_rate = tonumber(ARGV[2])
local current_time = tonumber(ARGV[3])

local tokens = tonumber(
    redis.call("HGET", key, "tokens")
)

local last_refill_time = tonumber(
    redis.call("HGET", key, "last_refill_time")
)

if not tokens then
    tokens = capacity
end

if not last_refill_time then
    last_refill_time = current_time
end

local elapsed =
    current_time - last_refill_time

local refill =
    elapsed * refill_rate

tokens =
    math.min(
        capacity,
        tokens + refill
    )

local allowed = 0

if tokens >= 1 then
    tokens = tokens - 1
    allowed = 1
end

redis.call(
    "HSET",
    key,
    "tokens",
    tokens,
    "last_refill_time",
    current_time
)

redis.call(
    "EXPIRE",
    key,
    math.ceil(capacity / refill_rate) + 60
)

return {
    allowed,
    tokens
}