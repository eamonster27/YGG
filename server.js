const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static('public'));

const port = process.env.PORT || 3000;
app.listen(port);

const apiRoute = require('./app/routes/api');

app.use(apiRoute);
