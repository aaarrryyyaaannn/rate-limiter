const express = require('express');
const app = express();
const tokenBucket = require('./middleware');
const port = 3000;

// Token bucket parameters
app.use(tokenBucket);
// Example route    
app.get('/', (req, res) => {
    res.send('Hello, world!');
}
);
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
