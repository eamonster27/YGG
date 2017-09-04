const express = require('express');
const router = express.Router();
const models = require('../../models');


router.get('/api/users', function(req, res, next){
  models.User.findAll().then(users => { res.json(users); });
})

router.get('/api/users/:user', function(req, res, next){
  models.User.findOne({
    where: {id: req.params.user},
    include: [
      {model: models.Checkin, as: 'Checkins'},
      {model: models.Checkup, as: 'Checkups'}]
  })
  .then(user => { res.json(user); });
})

router.get('/api/users/:user/checkins', function(req, res, next){
  models.User.findOne({
    where: {id: req.params.user}
  })
  .then(user => {
    models.Checkin.findAll({
      where: {UserID: user.dataValues.id},
      include: [
        {model: models.Ping, as: 'Pings'}]
    })
    .then(checkins => { res.json(checkins); })
  });
})

router.get('/api/users/:user/checkups', function(req, res, next){
  models.User.findOne({
    where: {id: req.params.user}
  })
  .then(user => {
    models.Checkup.findAll({
      where: {UserID: user.dataValues.id}
    })
    .then(checkups => { res.json(checkups); })
  });
})

router.get('/api/users/:user/checkins/:checkin', function(req, res, next){
  models.User.findOne({
    where: {id: req.params.user}
  })
  .then(user => {
    models.Checkin.findOne({
      where: {id: req.params.checkin, UserID: user.dataValues.id},
      include: [
        {model: models.Ping, as: 'Pings'}]
    })
    .then(checkin => { res.json(checkin); })
  });
})

router.get('/api/users/:user/checkups/:checkup', function(req, res, next){
  models.User.findOne({
    where: {id: req.params.user}
  })
  .then(user => {
    models.Checkup.findOne({
      where: {id: req.params.checkup, UserID: user.dataValues.id}
    })
    .then(checkup => { res.json(checkup); })
  });
})

router.get('/api/users/:user/checkins/:checkin/pings', function(req, res, next){
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

module.exports = router;
