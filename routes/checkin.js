const express = require('express'),
      models  = require('../models'),
      access = require('./access');

const router = express.Router();
//Scope: create:checkin read:checkin update:checkin
//Get All User Checkins
//Find user.
//Find all user checkins.
//Respond with checkins.
router.use('/checkins', access.jwtCheck, access.requireScope('read:checkin'));
router.get('/checkins', function(req, res, next){
  models.Checkin.findAll({
    where: {
      UserID: req.user.id
    },
    include: [
      {model: models.Ping, as: 'Pings'}
    ]
  }).then((checkins) => {
    res.json(checkins);
  })
})

//Get Individual User Checkin
//Find user.
//Find checkin.
//Respond with checkin.
router.get('/checkins/:checkinid', function(req, res, next){
  models.Checkin.findOne({
    where: {
      id: req.params.checkinid,
      UserID: req.user.id
    },
    include: [
      {model: models.Ping, as: 'Pings'}
    ]
  }).then((checkin) => {
    res.json(checkin);
  })
})

//Create New Checkin
//Verify user credentials.
//Create checkin.
//Set data values.
//Create corresponding checkup.
//Set data values.
//Respond with error or ok.
router.use('/create/checkin', access.jwtCheck, access.requireScope('create:checkin'));
router.post('/create/checkin', function(req, res){
  models.Checkup.create({
    reqUserID: req.user.id,
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
      UserID: req.user.id,
      CheckupID: checkup.dataValues.id
    })
  }).catch((error) => {
    return res.status(401).send(error);
  })
});

//Edit checkin (Lat, Lng, and Time only)
//Verify user credentials.
//Find checkin.
//Edit data values.
//Update checkup alerts.
//Respond with error or ok.
router.use('/update/checkin', access.jwtCheck, access.requireScope('update:checkin'));
router.post('/update/checkin', function(req, res){
  models.Checkin.findOne({
     where: {
       id: req.body.id,
       UserID: req.user.id
     }
  }).success((checkin) => {
    checkin.update({
      lat: req.body.lat,
      lng: req.body.lng,
      time: req.body.time,
      alerts: checkin.dataValues.alerts++,
    })
  }).catch((error) => {
    return res.status(401).send(error);
  })
})

module.exports = router;
