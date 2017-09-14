const express = require('express'),
      models  = require('../models'),
      access = require('./access');

const router = express.Router();
//Scope: read:user update:user
//Get All Users
//Find all users.
//Respond w/ all users.
// router.get('/users', function(req, res, next){
//   models.User.findAll().then(users => { res.json(users); });
// })

//Get Individual User
//Find user.
//Respond w/ user.
router.use('/user', access.jwtCheck, access.requireScope('read:user'));
router.get('/user', function(req, res, next){
  models.User.findOne({
    where: {
      id: req.user.id
    },
    include: [
      {model: models.Checkin, as: 'Checkins'},
      {model: models.Checkup, as: 'Checkups',
        include: [{model: models.Checkin, as: 'Checkin',
          include: [{model: models.Ping, as: 'Pings'}]}]}
    ]
  }).then((user) => {
    res.json(user);
  })
})

//Edit User (Everything but email)
//Find user.
//Verify user credentials.
//Edit user data.
//Respond with error or ok.
router.use('/update/user', access.jwtCheck, access.requireScope('update:user'));
router.post('/update/user', function(req, res){
  models.User.findOne({
     where: {
       id: req.user.id,
     }
  }).success((user) => {
    user.update({
      password: req.body.password,
      cell: req.body.cell,
      passcode: req.body.passcode,
      paniccode: req.body.paniccode,
    })
  }).catch((error) => {
    return res.status(401).send(error);
  })
})

//Delete User
//Find user.
//Verify user credentials.
//Delete user.
//Respond with error or ok.
// router.post('/delete-user', function(req, res){
//   models.User.findOne({
//      where: {
//        id: req.user.id,
//      }
//   }).then((user) => {
//     if(user) {
//       //Delete all user info
//       console.log("Found it!!!");
//     }
//     else {
//       //Error
//       console.log("No found it!!!");
//     }
//   })
// })

module.exports = router;
