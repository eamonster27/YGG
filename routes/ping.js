const express = require('express'),
      models  = require('../models'),
      access = require('./access');

const router = express.Router();

//Scope: create:ping read:pings

//Get All Checkin Pings
//Find user.
//Find checkin.
//Find pings.
//Respond with pings.
router.use('/pings', access.jwtCheck, access.requireScope('read:pings'));
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
router.use('/create/ping', access.jwtCheck, access.requireScope('create:ping'));
router.post('/create/ping', function(req, res){
  models.Ping.create({
    lat: req.body.lat,
    lng: req.body.lng,
    time: req.body.time,
    CheckinID: req.body.checkinid,
  }).then((ping) => {
    models.Checkin.findOne({
      where: {
        id: ping.dataValues.CheckinID
      }
    }).success((checkin) => {
      checkin.update({
        alerts: checkin.dataValues.alerts++
      })
    })
  }).catch((error) => {
    return res.status(401).send(error);
  })
})

module.exports = router;
