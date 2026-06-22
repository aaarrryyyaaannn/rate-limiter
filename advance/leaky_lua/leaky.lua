local key = KEYS[1]

local capacity = tonumber(ARGV[1])
local leak_rate = tonumber(ARGV[2])
local current_time = tonumber(ARGV[3])

local water = tonumber(
    redis.call("HGET", key, "water")
)

local last_leak_time = tonumber(
    redis.call("HGET", key, "last_leak_time")
)

if not water then
    water = 0
end

if not last_leak_time then
    last_leak_time = current_time
end

local elapsed =
    current_time - last_leak_time

local leaked =
    elapsed * leak_rate

water =
    math.max(
        0,
        water - leaked
    )

local allowed = 0

if water < capacity then
    water = water + 1
    allowed = 1
end

redis.call(
    "HSET",
    key,
    "water",
    water,
    "last_leak_time",
    current_time
)

redis.call(
    "EXPIRE",
    key,
    math.ceil(capacity / leak_rate) + 60
)

return {
    allowed,
    water
}