const express = require('express');
const router = express.Router();
const models = require('../models');

//Get All User Checkins
//Find user.
//Find all user checkins.
//Respond with checkins.
router.get('/users/:user/checkins', function(req, res, next){
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

//Get Individual User Checkin
//Find user.
//Find checkin.
//Respond with checkin.
router.get('/users/:user/checkins/:checkin', function(req, res, next){
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

//Create New Checkin
//Verify user credentials.
//Create checkin.
//Set data values.
//Create corresponding checkup.
//Set data values.
//Respond with error or ok.
router.post('/user/:userid/new-checkin', function(req, res){
  models.Checkin.create({
    status: "On Schedule",
    lat: req.body.lat,
    lng: req.body.lng,
    time: req.body.time,
    requestStatus: "Pending",
    emContactID: req.body.emContactID,
    UserID: req.params.userid,
  }).then(checkin => {
    models.Checkup.create({
      reqUserID: checkin.dataValues.UserID,
      UserID: checkin.dataValues.emContactID,
      CheckinID: checkin.dataValues.id,
    })
  });
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
    if(checkin) {
      console.log("Found Checkin!!!");
      checkin.dataValues.lat = req.body.lat;
      checkin.dataValues.lng = req.body.lng;
      checkin.dataValues.time = req.body.time;
      models.Checkup.findOne({
        where: {
          reqUserID: checkin.dataValues.UserID,
          CheckinID: checkin.dataValues.id
        }
      }).then((checkup) => {
        if(checkup) {
          console.log("Found Checkup!!!");
          checkup.dataValues.alerts += 1;
        }
        else {
          //Error
          console.log("No found Checkup!!!");
        }
      })
    }
    else {
      //Error
      console.log("No found Checkin!!!");
    }
  })
})

//Delete Checkin
//Verify user credentials.
//Find checkin.
//Find corresponding checkup.
//Delete checkup.
//Delete checkin.
//Respond with error or ok.
router.post('/user/:userid/delete-checkin', function(req, res){
  models.Checkin.findOne({
     where: {
       id: req.body.id,
       UserID: req.params.userid
     }
  }).then((checkin) => {
    if(checkin) {
      console.log("Found Checkin!!!");
      models.Checkup.findOne({
         where: {
           reqUserID: checkin.dataValues.UserID,
           CheckinID: checkin.dataValues.id
         }
      }).then((checkup) => {
        if(checkup) {
          //Delete Checkup then Checkin
          console.log("Found Checkup!!!");
        }
        else {
          //Error
          console.log("No found Checkup!!!");
        }
      })
    }
    else {
      //Error
      console.log("No found Checkin!!!");
    }
  })
})

module.exports = router;
