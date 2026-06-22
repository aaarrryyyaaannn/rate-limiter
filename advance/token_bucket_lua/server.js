const express = require("express");
const tokenBucket = require("./middleware.js");
const app = express();

app.use(tokenBucket);

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Welcome to the Token Bucket Rate Limiter with Lua!",
    });
}
);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
}
);