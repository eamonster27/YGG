const express = require('express'),
      jwt     = require('express-jwt'),
      models  = require('../models'),
      config  = require('../config');

const router = express.Router();

// MOVE TO ONE FILE!!!
// Validate access_token
var jwtCheck = jwt({
  secret: config.secret,
  aud: config.audience,
  iss: config.issuer
})

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
// MOVE TO ONE FILE!!!

//Scope: create:checkin read:checkin update:checkin
//Get All User Checkins
//Find user.
//Find all user checkins.
//Respond with checkins.
router.use('/checkins', jwtCheck, requireScope('read:checkin'));
router.get('/checkins', function(req, res, next){
  models.Checkin.findAll({
    where: {
      UserID: req.user.sub
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
      UserID: req.user.sub
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
router.use('/create/checkin', jwtCheck, requireScope('create:checkin'));
router.post('/create/checkin', function(req, res){
  models.Checkup.create({
    reqUserName: req.body.UserName,
    reqUserID: req.user.sub,
    UserID: req.body.emContactID,
  }).then((checkup) => {
    models.Checkin.create({
      alerts: 0,
      status: "Scheduled",
      address: req.body.address,
      lat: req.body.lat,
      lng: req.body.lng,
      time: req.body.time,
      requestStatus: "Pending",
      emContactID: req.body.emContactID,
      UserID: req.user.sub,
      CheckupID: checkup.dataValues.id
    }).then((checkin) => {
      res.status(201).send({
        checkin: checkin
      });
    })
  }).catch((error) => {
    return res.status(401).send(error);
  })
});

//NOT COMPLETE
//Edit checkin (Lat, Lng, and Time only)
//Verify user credentials.
//Find checkin.
//Edit data values.
//Update checkup alerts.
//Respond with error or ok.
router.use('/update/checkin', jwtCheck, requireScope('update:checkin'));
router.put('/update/checkin', function(req, res){
  models.Checkin.update({
    alerts: req.body.alerts,
    status: req.body.status,
    address: req.body.address,
    lat: req.body.lat,
    lng: req.body.lng,
    time: req.body.time,
    requestStatus: req.body.requestStatus,
    emContactID: req.body.emContactID },
  { where: {
      id: req.body.id,
    },
    returning: true,
    plain: true
  }).then((checkin) => {
    res.status(201).send({
      checkin: checkin
    });
  }).catch((error) => {
    return res.status(401).send(error);
  })
})

module.exports = router;
