const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));

const port = process.env.PORT || 3000;
app.listen(port);

const apiRoute = require('./routes/api');

app.use(apiRoute);
