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

//Scope: read:checkup delete:checkup
//Get All User Checkups
//Find user.
//Find all user checkups.
//Respond with checkups.
router.use('/checkups', jwtCheck, requireScope('read:checkup'));
router.get('/checkups', function(req, res, next){
  models.Checkup.findAll({
    where: {
      UserID: req.user.sub
    },
    include: [{
      model: models.Checkin, as: 'Checkin',
      include: [{model: models.Ping, as: 'Pings'}]}
    ]
  }).then((checkups) => {
    res.json(checkups);
  }).catch((error) => {
    console.log(error)
  })
})

//Get Individual User Checkup
//Find user.
//Find checkup.
//Respond with checkup.
router.get('/checkups/:checkupid', function(req, res, next){
  models.Checkup.findOne({
    where: {
      id: req.params.checkupid,
      UserID: req.user.sub
    },
    include: [
      {model: models.Checkin, as: 'Checkin',
        include: [{model: models.Ping, as: 'Pings'}]}
    ]
  }).then((checkup) => {
    res.json(checkup);
  })
})

//Delete Checkup/Checkin/Pings
//Verify user credentials.
//Find checkup.
//Find corresponding checkin.
//Find corresponding pings.
//Delete pings.
//Delete checkin.
//Delete checkup.
//Respond with error or ok.
router.use('/delete/checkup', jwtCheck, requireScope('delete:checkup'));
router.delete('/delete/checkup', function(req, res){
  models.Pings.destroy({
    where: {
      CheckinID: req.body.CheckinID
    }
  }).then(() => {
    models.Checkin.destroy({
      where: {
        id: req.body.CheckinID
      }
    })
  }).then(() => {
    models.Checkup.destroy({
      where: {
        id: req.body.CheckupID
      }
    }).then((checkup) => {
      res.json(checkup);
    })
  }).catch((error) => {
    return res.status(401).send(error);
  })
})

module.exports = router;
