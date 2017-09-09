const express = require('express');
const router = express.Router();
const models = require('../models');

//Get All Checkin Pings
//Find user.
//Find checkin.
//Find pings.
//Respond with pings.
router.get('/users/:user/checkins/:checkin/pings', function(req, res, next){
  models.User.findOne({
    where: {
      id: req.params.user
    }
  }).then((user) => {
    models.Checkin.findOne({
      where: {
        id: req.params.checkin,
        UserID: user.dataValues.id
      }
    }).then((checkin) => {
      models.Ping.findAll({
        where: {
          CheckinID: checkin.dataValues.id
        }
      }).then((pings) => {
        res.json(pings);
      })
    })
  });
})

//Create New Ping [Called by Alarm Feature]
//Verify user credentials.
//Create ping.
//Set data values.
//Find corresponding checkin.
//Update alerts.
//Respond with error or ok.
router.post('/checkin/:checkin/new-ping', function(req, res){
  models.Ping.create({
    lat: req.body.lat,
    lng: req.body.lng,
    time: req.body.time,
    CheckinID: req.params.checkin,
  }).then((ping) => {
    models.Checkin.findOne({
      where: {
        id: ping.dataValues.CheckinID
      }
    }).then((checkin) => {
      checkin.dataValues.alerts += 1;
      checkin.save();
    })
  })
})

module.exports = router;
