const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())

const port = process.env.PORT || 3000;
app.listen(port);

const apiRoute = require('./routes/API/api');
const userRoute = require('./routes/CRUD/user');
const checkinRoute = require('./routes/CRUD/checkin');

app.use(apiRoute);
app.use(userRoute);
app.use(checkinRoute);
