const express = require('express'),
      jwt     = require('express-jwt'),
      models  = require('../models'),
      config  = require('../config');

const router = express.Router();

// Validate access_token
var jwtCheck = jwt({
  secret: config.secret,
  aud: config.audience,
  iss: config.issuer
});

// Check for scope
function requireScope(scope) {
  return function (req, res, next) {
    var has_scopes = false;

    var user_scopes = req.user.scope.split(" ");
    for(let i = 0; i < user_scopes.length; ++i) {
      if(user_scopes[i] === scope) { has_scopes = true; }
    }

    if (!has_scopes) {
      res.sendStatus(401);
      return;
    }
    next();
  };
}

//Scope: create:ping read:pings

//Get All Checkin Pings
//Find user.
//Find checkin.
//Find pings.
//Respond with pings.
router.use('/pings', jwtCheck, requireScope('read:pings'));
router.get('/pings', function(req, res, next){
  models.Ping.findAll({
    where: {
      CheckinID: req.body.checkinid
    }
  }).then((pings) => {
    res.json(pings);
  })
})

//Create New Ping [Called by Alarm Feature]
//Verify user credentials.
//Create ping.
//Set data values.
//Find corresponding checkin.
//Update alerts.
//Respond with error or ok.
router.use('/create/ping', jwtCheck, requireScope('create:ping'));
router.post('/create/ping', function(req, res){
  models.Ping.create({
    lat: req.body.lat,
    lng: req.body.lng,
    time: req.body.time,
    CheckinID: req.body.CheckinID,
  }).then((ping) => {
    models.Checkin.findOne({
      where: {
        id: ping.dataValues.CheckinID
      }
    }).then((checkin) => {
      checkin.update({
        alerts: checkin.dataValues.alerts++
      }).then((checkin) => {
        res.status(201).send({
          checkin: checkin
        });
      })
    })
  }).catch((error) => {
    return res.status(401).send(error);
  })
})

module.exports = router;
