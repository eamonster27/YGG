const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())

const port = process.env.PORT || 3000;
app.listen(port);

const sessionRoute = require('./routes/session');
const userRoute = require('./routes/user');
const checkinRoute = require('./routes/checkin');
const checkupRoute = require('./routes/checkup');
const pingRoute = require('./routes/ping');

app.use(sessionRoute);
app.use(userRoute);
app.use(checkinRoute);
app.use(checkupRoute);
app.use(pingRoute);
