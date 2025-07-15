// import express
const express = require('express');

// init app
const app = express();

// set port
const port = 3000;

// route
app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});