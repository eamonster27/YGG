const express = require('express');
const router = express.Router();
const models = require('../models');

//Get All Users
//Find all users.
//Respond w/ all users.
router.get('/users', function(req, res, next){
  models.User.findAll().then(users => { res.json(users); });
})

//Get Individual User
//Find user.
//Respond w/ user.
router.get('/users/:id', function(req, res, next){
  models.User.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {model: models.Checkin, as: 'Checkins'},
      {model: models.Checkup, as: 'Checkups'}
    ]
  }).then((user) => {
    res.json(user);
  });
})

//Edit User (Everything but email)
//Find user.
//Verify user credentials.
//Edit user data.
//Respond with error or ok.
router.post('/edit-user', function(req, res){
  models.User.findOne({
     where: {
       id: req.body.id,
       email: req.body.email,
     }
  }).then((user) => {
    if(user) {
      console.log("Found user!!!");
      user.dataValues.firstname = req.body.firstname;
      user.dataValues.lastname = req.body.lastname;
      user.dataValues.password = req.body.password;
      user.dataValues.cell = req.body.cell;
      user.dataValues.passcode = req.body.passcode;
      user.dataValues.paniccode = req.body.paniccode;
      user.save();
    }
    else {
      //Error
      console.log("No found user!!!");
    }
  })
})

//Delete User
//Find user.
//Verify user credentials.
//Delete user.
//Respond with error or ok.
router.post('/delete-user', function(req, res){
  models.User.findOne({
     where: {
       email: req.body.email,
       password: req.body.password
     }
  }).then((user) => {
    if(user) {
      //Delete all user info
      console.log("Found it!!!");
    }
    else {
      //Error
      console.log("No found it!!!");
    }
  })
})

module.exports = router;
