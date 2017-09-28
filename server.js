const express    = require('express'),
      bodyParser = require('body-parser'),
      https       = require('https'),
      dotenv     = require('dotenv');

const app = express();

dotenv.load();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(function(err, req, res, next) {
  if (err.name === 'StatusError') {
    res.send(err.status, err.message);
  }
  else {
    next(err);
  }
});

const port = process.env.PORT || 3000;

https.createServer(app).listen(port, function (err) {
  console.log('Listening on https://localhost:' + port);
});

app.use(require('./routes/session'));
app.use(require('./routes/user'));
app.use(require('./routes/checkin'));
app.use(require('./routes/checkup'));
app.use(require('./routes/ping'));
