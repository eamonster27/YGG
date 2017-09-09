const express = require('express');
const router = express.Router();
const models = require('../models');

//Get All User Checkups
//Find user.
//Find all user checkups.
//Respond with checkups.
router.get('/users/:user/checkups', function(req, res, next){
  models.User.findOne({
    where: {
      id: req.params.user
    }
  }).then((user) => {
    models.Checkup.findAll({
      where: {
        UserID: user.dataValues.id
      },
      include: [{
        model: models.Checkin, as: 'Checkin',
        include: [{model: models.Ping, as: 'Pings'}]}
      ]
    }).then((checkups) => {
      res.json(checkups);
    })
  });
})

//Get Individual User Checkup
//Find user.
//Find checkup.
//Respond with checkup.
router.get('/users/:user/checkups/:checkup', function(req, res, next){
  models.User.findOne({
    where: {
      id: req.params.user
    }
  }).then((user) => {
    models.Checkup.findOne({
      where: {
        id: req.params.checkup,
        UserID: user.dataValues.id
      },
      include: [{
        model: models.Checkin, as: 'Checkin',
        include: [{model: models.Ping, as: 'Pings'}]}
      ]
    }).then((checkup) => {
      res.json(checkup);
    })
  });
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
router.post('/user/:userid/delete-checkup', function(req, res){
  models.Checkup.findOne({
    where: {
      id: req.body.CheckupID
    }
  }).then((checkup) => {
    return checkup.destroy();
  })
})

module.exports = router;
