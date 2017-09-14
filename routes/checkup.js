const express = require('express'),
      models  = require('../models'),
      access = require('./access');

const router = express.Router();
//Scope: read:checkup delete:checkup
//Get All User Checkups
//Find user.
//Find all user checkups.
//Respond with checkups.
router.use('/checkups', access.jwtCheck, access.requireScope('read:checkup'));
router.get('/checkups', function(req, res, next){
  models.Checkup.findAll({
    where: {
      UserID: req.user.id
    },
    include: [{
      model: models.Checkin, as: 'Checkin',
      include: [{model: models.Ping, as: 'Pings'}]}
    ]
  }).then((checkups) => {
    res.json(checkups);
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
      UserID: req.user.id
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
router.use('/delete/checkup', access.jwtCheck, access.requireScope('delete:checkup'));
router.post('/delete/checkup', function(req, res){
  models.Checkup.findOne({
    where: {
      id: req.body.CheckupID,
      reqUserID: req.user.id
    }
  }).success((checkup) => {
    checkup.destroy();
  }).catch((error) => {
    return res.status(401).send(error);
  })
})

module.exports = router;
