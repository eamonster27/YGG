const express = require('express');
const router = express.Router();
const models = require('../models');
const moment = require('moment');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));



//create ping ( add to database )
router.post('/create/checkin/:checkin/ping', function(req, res){
  models.Ping.create({
    lat: req.body.lat, //parser may not be useable for lat lng
    lng: req.body.lng,
    time: req.body.time, //moment().format('LLLL')
    CheckinID: req.params.checkin,
  })//.then notification for emcontact
  //Add a notification index to checkup. When ping is initiated through checkin,
  //also initiate notification for checkup originating with checkin.

  //delete ping
})

module.exports = router;


  // models.User.findOne({
  //   where: {id: req.params.user}
  // })
  // .then(user => {
  //   models.Checkin.findOne({
  //     where: {id: req.params.checkin, UserID: user.dataValues.id},
  //     include: [
  //       {model: models.Ping, as: 'Pings'}]
  //   })
  //   .then(checkin => { res.json(checkin); })
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
