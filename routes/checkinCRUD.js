const express = require('express');
const router = express.Router();
const models = require('../models');

//show checkin??? Maybe move the API here.

//create checkin ( add to database )
router.post('/user/:userid/create/checkin', function(req, res, next){
  models.Checkin.create({
    status: "On Schedule", //On Schedule, Home Safe, Snoozed, Disabled, Panic
    lat: req.body.lat, //user types address, address converted to lat lng, then post to create
    lng: req.body.lng,
    time: req.body.time,
    requestStatus: "Pending",
    emContactID: req.body.emContactID, // use dropdown menu after search query to select user.
    UserID: req.params.userid,
  }).then(checkin => {
    models.Checkup.create({
      reqUserID: checkin.UserID, //requesting or originating user
      UserID: checkin.emContactID,
      CheckinID: checkin.id,
    })
  });
});

//edit checkin (status, lat, lng, time, emCell, requestStatus, associated checkup)
//update checkin ( add ping(s))
//delete checkin ( status, lat, lng, time, emCell, requestStatus, associated checkup )


module.exports = router;

//
// models.User.findOne({
//   where: {id: req.params.user}
// })
// .then(user => {
//   models.Checkin.findAll({
//     where: {UserID: user.dataValues.id},
//     include: [
//       {model: models.Ping, as: 'Pings'}]
//   })
//   .then(checkins => { res.json(checkins); })
// });

//
// router.post('/api/users/:user/checkups/:checkup', function(req, res){
//   models.User.findOne({
//     where: {id: req.params.user}
//   })
//   .then(user => {
//     models.Checkup.findOne({
//       where: {id: req.params.checkup, UserID: user.dataValues.id}
//     })
//     .then(checkup => { res.json(checkup); })
//   });
// })
//
// router.post('/api/users/:user/checkins/:checkin/pings', function(req, res){
//   models.User.findOne({
//     where: {id: req.params.user}
//   })
//   .then(user => {
//     models.Checkin.findOne({
//       where: {id: req.params.checkin, UserID: user.dataValues.id}
//     })
//     .then(checkin => {
//       models.Ping.findAll({
//         where: {CheckinID: checkin.dataValues.id}
//       })
//       .then(pings => { res.json(pings); })
//     })
//   });
// })
