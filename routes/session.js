const express = require('express');
const router = express.Router();
const models = require('../models');

//Very important that session persists permanently.

//Register New User
//Check if user exists.
//If not, create new user.
//Persist session to local storage.
//Respond with error or ok.
router.post('/register', function(req, res){
  models.User.create({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: req.body.password,
    cell: req.body.cell,
    passcode: req.body.passcode,
    paniccode: req.body.paniccode,
  })
})

//Login
//Find user.
//Verify credentials.
//Persist to local storage.
//Respond with error or ok.
router.post('/auth', function(req, res){
  models.User.findOne({
       where: {
         email: req.body.email,
         password: req.body.password
       }
  }).then((user) => {
    if(user) {
      //persist login and redirect
      console.log("Found it!!!");
    }
    else {
      //render with error
      console.log("No found it!!!");
    }
  })
})

//Logout
//Destroy session.
//Remove form local storage.
//Respond with error or ok.
router.post("/logout", function(req,res){
})














module.exports = router;
