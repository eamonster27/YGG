const express = require('express');
const router = express.Router();
const models = require('../models');

//Get All User Checkins
//Find user.
//Find all user checkins.
//Respond with checkins.
router.get('/users/:user/checkins', function(req, res, next){
  models.User.findOne({
    where: {
      id: req.params.user
    }
  }).then(user => {
    models.Checkin.findAll({
      where: {
        UserID: user.dataValues.id
      },
      include: [
        {model: models.Ping, as: 'Pings'}
      ]
    }).then(checkins => {
      res.json(checkins);
    })
  });
})

//Get Individual User Checkin
//Find user.
//Find checkin.
//Respond with checkin.
router.get('/users/:user/checkins/:checkin', function(req, res, next){
  models.User.findOne({
    where: {
      id: req.params.user
    }
  }).then((user) => {
    models.Checkin.findOne({
      where: {
        id: req.params.checkin,
        UserID: user.dataValues.id
      },
      include: [
        {model: models.Ping, as: 'Pings'}
      ]
    }).then((checkin) => {
      res.json(checkin);
    })
  });
})

//Create New Checkin
//Verify user credentials.
//Create checkin.
//Set data values.
//Create corresponding checkup.
//Set data values.
//Respond with error or ok.
router.post('/user/:userid/new-checkin', function(req, res){
  models.Checkup.create({
    reqUserID: req.params.userid,
    UserID: req.body.emContactID,
  }).then((checkup) => {
    models.Checkin.create({
      alerts: 0,
      status: "On Schedule",
      lat: req.body.lat,
      lng: req.body.lng,
      time: req.body.time,
      requestStatus: "Pending",
      emContactID: req.body.emContactID,
      UserID: req.params.userid,
      CheckupID: checkup.dataValues.id
    })
  })
});

//Edit checkin (Lat, Lng, and Time only)
//Verify user credentials.
//Find checkin.
//Edit data values.
//Update checkup alerts.
//Respond with error or ok.
router.post('/user/:userid/edit-checkin', function(req, res){
  models.Checkin.findOne({
     where: {
       id: req.body.id,
       UserID: req.params.userid
     }
  }).then((checkin) => {
    checkin.dataValues.lat = req.body.lat;
    checkin.dataValues.lng = req.body.lng;
    checkin.dataValues.time = req.body.time;
    checkin.dataValues.alerts =+ 1;
    checkin.save()
  })
})

module.exports = router;
