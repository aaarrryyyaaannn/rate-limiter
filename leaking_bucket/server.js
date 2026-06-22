const express = require("express");
const leakyBucket = require("./middleware.js");

const app = express();

app.use(leakyBucket);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Welcome to the Leaking Bucket Rate Limiter!",
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
