const express = require("express");
const app = express();
const ip = require("ip");
const hideip = require("./hideip").hideip;
const PORT = process.env.PORT || 3000;

const max_requests = 5;
const time_window = 10 * 1000; // 1 minute
let ip_mapping = {};

setInterval(() => {
  ip_mapping = {};
  console.log("Cleared IP mapping");
}, time_window);

app.use((req, res, next) => {
  const my_ip = hideip(ip.address());
  ip_mapping[my_ip] = ip_mapping[my_ip] + 1|| 1;

  console.log(`recieved request no. ${ip_mapping[my_ip]} from ip ${my_ip}`);

  if (ip_mapping[my_ip] > max_requests) {
    console.error(`Too many requests from ip ${my_ip}`);
    return res.status(429).send("Too many requests. Please try again later.");
  }
  next();
});
  // Remove requests outside the time window
  

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const myip = hideip(ip.address());
console.log(`Server is running on IP: ${myip}`);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
