const express = require('express'),
      ejwt    = require('express-jwt'),
      jwt     = require('jsonwebtoken'),
      _       = require('lodash'),
      models  = require('../models'),
      config  = require('../config');

const router = express.Router();
//Very important that session persists permanently.

function createIDToken(user) {
  return jwt.sign(_.omit(user, 'password', 'cell', 'paniccode', 'passcode'),
          config.secret,
          { expiresIn: 60 }); //increase later
}

function createAccessToken(user) {
  return jwt.sign({
    algorithm: 'HS256',
    exp: Math.floor(Date.now() / 1000) + (60), //increase later
    aud: config.audience,
    iss: config.issuer,
    jwtid: genJwtid(),
    sub: user.id, //Possible issue
    scope: "read:user update:user create:checkin read:checkin update:checkin delete:checkin read:checkup create:ping read:pings",
  }, config.secret);
}

function genJwtid() {
  let jwtid = '';
  let possible = /[A-Za-z0-9]/;

  for(let i = 0; i < 16; i++) {
    jwtid += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return jwtid;
}

//Register New User
//Check if user exists.
//If not, create new user.
//Persist session to local storage.
//Respond with error or ok.
router.post('/register', function(req, res){

  if(!req.body.email || !req.body.password) {
    return res.status(400).send("Please enter your email and password.");
  }

  models.User.findOne({
     where: {
       email: req.body.email,
     }
  }).then((target) => {
    if(target) {
      return res.status(400).send("Email taken.");
    }
    else {
      console.log("Email available.");
      models.User.create({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password,
        cell: req.body.cell,
        passcode: req.body.passcode,
        paniccode: req.body.paniccode,
      }).then((user) => {
        res.status(201).send({
          id_token: createIDToken(user),
          access_token: createAccessToken(user)
        })
      }).catch((error) => {
        return res.status(401).send(error);
      })
    }
  })
})

//Login
//Find user.
//Verify credentials.
//Persist to local storage.
//Respond with error or ok.
router.post('/auth', function(req, res){
  if(!req.body.email || !req.body.password) {
    return res.status(400).send("Please enter your email and password.");
  }

  models.User.findOne({
     where: {
       email: req.body.email,
       password: req.body.password,
     }
  }).then((user) => {
    if(user) {
      //persist login and redirect
      res.status(201).send({
        id_token: createIDToken(user),
        access_token: createAccessToken(user)
      })
    }
    else {
      //res with error
      return res.status(401).send("The username or password don't match our records.");
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
