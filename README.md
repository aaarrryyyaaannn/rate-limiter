# Rate Limiter Lab

A collection of rate limiting algorithms implemented from scratch using Node.js, Redis and Lua Scripts.

The purpose of this repository is to understand how modern backend systems handle traffic control, request throttling and distributed rate limiting.

---

## Implemented Algorithms

### Basic Implementations

* Fixed Window Counter
* Sliding Window
* Token Bucket
* Leaky Bucket

### Advanced Redis + Lua Implementations

* Token Bucket using Redis Lua Scripts
* Leaky Bucket using Redis Lua Scripts

---

## Tech Stack

* Node.js
* Express.js
* Redis / Memurai
* ioredis
* Lua Scripting

---

## Why This Project?

Most developers use rate limiting libraries without understanding how they work internally.

This project focuses on implementing the underlying algorithms from scratch and understanding:

* Request throttling
* Burst traffic handling
* Traffic shaping
* Redis data structures
* Atomic operations
* Race conditions
* Lua scripting

---

## Project Structure

```text
rate-limiter-lab
|
├── fixed-window
├── sliding-window
├── token-bucket
├── leaky-bucket
|
├── advanced
│   ├── token-bucket-lua
│   └── leaky-bucket-lua
|
├── README.md
└── BENCHMARKS.md
```

---

## Learning Outcomes

Through this project I explored:

* Redis fundamentals
* Rate limiting algorithms
* Distributed systems basics
* Redis Lua scripting
* Atomic operations
* Backend performance engineering

---

## Future Enhancements

* Sliding Window Log
* Sliding Window Counter
* Distributed Rate Limiter
* Redis Cluster Integration
* Load Testing & Benchmarking

---

## Author

Aryan Devkar

Backend Engineering • Redis • Node.js • Distributed Systems
