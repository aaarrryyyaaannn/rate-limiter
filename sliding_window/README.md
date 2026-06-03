# 🚦 Distributed Rate Limiter

A distributed rate limiting service built with **Node.js**, **Express**, **Redis**, and **Lua Scripts**.

This project uses the **Token Bucket Algorithm** to enforce user-based and endpoint-based rate limits while ensuring atomic operations through Redis Lua scripting.

---

## ✨ Features

✅ User-based rate limiting

✅ Endpoint-based rate limiting

✅ Token Bucket algorithm

✅ Redis-backed distributed storage

✅ Atomic operations using Lua scripts

✅ HTTP 429 response for exceeded limits

✅ Horizontal scalability

---

## 🏗️ Architecture

```text
Client
   │
   ▼
Express API
   │
   ▼
Rate Limiter Middleware
   │
   ▼
Rate Limiter Service
   │
   ▼
Redis Lua Script
   │
   ▼
Redis
```

---

## 🛠️ Tech Stack

* Node.js
* Express.js
* Redis
* Lua
* Docker
* Jest

---

## 📂 Project Structure

```text
rate-limiter/
│
├── src
│   ├── middleware
│   ├── services
│   ├── routes
│   └── app.js
│
├── lua
│   └── tokenBucket.lua
│
├── tests
│
├── docs
│   ├── requirements.md
│   ├── architecture.md
│   └── api-design.md
│
├── Dockerfile
├── docker-compose.yml
└── README.md
```

---

## ⚙️ How It Works

1. Request reaches Express API.
2. Middleware extracts user and endpoint information.
3. Rate Limiter Service executes a Redis Lua script.
4. Lua script refills and consumes tokens atomically.
5. Request is either:

   * ✅ Allowed
   * ❌ Rejected with `429 Too Many Requests`

---

## 📌 Example Policy

```json
{
  "/login": {
    "capacity": 5,
    "refillRate": 5
  },
  "/products": {
    "capacity": 100,
    "refillRate": 100
  }
}
```

---

## 📊 Performance Goals

| Metric             | Target |
| ------------------ | ------ |
| Rate Limit Check   | < 5 ms |
| Redis Operations   | O(1)   |
| Atomic Updates     | ✅      |
| Horizontal Scaling | ✅      |

---

## 🚀 Future Enhancements

* Prometheus Metrics
* Grafana Dashboard
* Sliding Window Algorithm
* API Key Rate Limiting
* Redis Cluster Support
* Kubernetes Deployment

---

## 📚 Learning Outcomes

This project demonstrates:

* System Design
* Distributed Systems
* Redis Internals
* Lua Scripting
* Rate Limiting Algorithms
* Backend Scalability
* Middleware Design

---

⭐ If you found this project useful, consider giving it a star.
