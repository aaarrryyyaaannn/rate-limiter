# Rate Limiter Lab

A comprehensive collection of rate limiting algorithms implemented from scratch using Node.js and Redis.

This repository explores how modern API gateways and backend systems protect services from abuse, traffic spikes, and resource exhaustion.

The goal of this project is not only to implement rate limiting algorithms but also to understand their trade-offs, performance characteristics, memory usage, fairness, and behavior in distributed systems.

---

## Algorithms Implemented

### Basic Implementations

* Fixed Window Counter
* Sliding Window Log
* Sliding Window Counter
* Token Bucket
* Leaky Bucket

### Advanced Redis Implementations

* Token Bucket using Redis Lua Scripts
* Leaky Bucket using Redis Lua Scripts

---

## Technologies Used

* Node.js
* Express.js
* Redis / Memurai
* ioredis
* Lua Scripting

---

## Why This Repository?

Most applications use rate limiting libraries without understanding the underlying algorithms.

This repository implements the internals from scratch to understand:

* Request throttling
* Burst handling
* Fairness
* Atomic operations
* Distributed systems concerns
* Redis data structures
* Lua scripting
* Performance optimization

---

## Project Structure

```text
rate-limiter-lab
|
├── basic
│   ├── fixed-window
│   ├── sliding-window-log
│   ├── sliding-window-counter
│   ├── token-bucket
│   └── leaky-bucket
|
├── advanced
│   ├── token-bucket-lua
│   └── leaky-bucket-lua
|
├── benchmarks
│
├── README.md
└── BENCHMARKS.md
```

---

## Concepts Explored

### Redis Data Structures

* Strings
* Hashes
* Sorted Sets

### Redis Features

* Expiration (TTL)
* Pipelines
* Lua Scripting

### Distributed Systems Concepts

* Atomic Operations
* Race Conditions
* Concurrent Requests
* Distributed Rate Limiting Foundations

---

## Lua Script Based Rate Limiting

The advanced implementations move the complete algorithm execution into Redis.

Benefits:

* Atomic execution
* Reduced network round trips
* Race condition elimination
* Better scalability
* Production-oriented design

---

## Future Work

* Distributed Token Bucket
* Distributed Leaky Bucket
* Sliding Window Lua Implementation
* Redis Cluster Support
* Benchmark Dashboard
* Load Testing using Autocannon

---

## Learning Outcomes

Through this repository I explored:

* Redis internals
* Caching patterns
* Distributed systems fundamentals
* Lua scripting
* Backend performance engineering
* API gateway concepts

---

## Author

Aryan Devkar

Backend Engineering • Distributed Systems • Redis • Node.js
