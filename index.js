const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();
const router = require('./router.js');
const mongoose = require('mongoose');
const cors = require('cors');

//db set up note: when you run mongod --dbpath */data/db
mongoose.connect('mongodb://localhost/auth');

//app setup
app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json({ type: '*/*' }));
router(app);

//app listerners
const port = process.env.PORT || 3000;
const server = http.createServer(app);
server.listen(port);
console.log(`Server listening on port: ${port}`)
