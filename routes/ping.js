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
    where: {id: req.params.user}
  })
  .then(user => {
    models.Checkin.findOne({
      where: {id: req.params.checkin, UserID: user.dataValues.id}
    })
    .then(checkin => {
      models.Ping.findAll({
        where: {CheckinID: checkin.dataValues.id}
      })
      .then(pings => { res.json(pings); })
    })
  });
})

//Create New Ping [Called by Alarm Feature]
//Verify user credentials.
//Create ping.
//Set data values.
//Find corresponding checkup.
//Update alerts.
//Respond with error or ok.
router.post('/checkin/:checkin/new-ping', function(req, res){
  models.Ping.create({
    lat: req.body.lat,
    lng: req.body.lng,
    time: req.body.time,
    CheckinID: req.params.checkin,
  }).then((ping) => {
    models.Checkup.findOne({
      where: {
        CheckinID: ping.dataValues.CheckinID
      }
    }).then((checkup) => {
      if(checkup) {
        console.log("Found Checkup!!!");
        checkup.dataValues.alerts += 1;
      }
      else {
        //Error
        console.log("No found Checkup!!!");
      }
    })
  })
})

//Delete Pings
//Verify user credentials.
//Find all pings.
//Delete all pings.
//Respond with error or ok.
router.post('/checkin/:checkin/delete-pings', function(req, res){
  models.Ping.findAll({
     where: {
       CheckinID: req.params.checkin
     }
  }).then((pings) => {
    if(pings) {
      //Delete all pings
      console.log("Found pings!!!");
    }
    else {
      //Error
      console.log("Found no pings!!!");
    }
  })
})

module.exports = router;
