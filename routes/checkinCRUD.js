const express = require('express');
const router = express.Router();
const models = require('../models');

//show checkin??? Maybe move the API here.

//create checkin ( add to database )
router.post('/user/:user/create/checkin', function(req, res, next){
  models.Checkin.create({
    status: "On Schedule", //On Schedule, Home Safe, Snoozed, Disabled, Panic
    lat: req.body.lat, //user types address, address converted to lat lng, then post to create
    lng: req.body.lng,
    time: req.body.time,
    emCell: req.body.emCell, //validate w/ database query, on green post to create
    requestStatus: "Pending",
    UserID: req.params.user,
  }).then(checkin => {
    models.User.findOne({
      where: {cell: req.params.checkin.emCell}
    }).then(emContact => {
      models.User.findOne({
        where: {id: req.params.user}
      }).then(requestingUser => {
        //find the receiving userID with cell number
        //set equal to UserID variable
        //.then pass checkin to this model and access its id for checkinid
        models.Checkup.create({
          cell: requestingUser.cell, //senders cellphone //CHANGE THIS TO reqUserID this avoids the third .then statment
          UserID: emContact.id, //receiving userid
          CheckinID: checkin.id, //<-------
        })
      })
    })
  })
})

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
