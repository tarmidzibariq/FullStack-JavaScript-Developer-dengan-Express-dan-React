// import express
const express = require('express');

// import cors
const cors = require('cors');

// import body-parser
const bodyParser = require('body-parser');

// import router
const router = require('./router');

// init app
const app = express();

// use cors
app.use(cors());

//  use body-parser
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// set port
const port = 3000;

// route
app.get('/', (req, res) => {
    res.send('Hello World!');
})

// define routes
app.use('/api', router);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});