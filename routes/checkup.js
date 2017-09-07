const express = require('express');
const router = express.Router();
const models = require('../models');

//Get All User Checkups
//Find user.
//Find all user checkups.
//Respond with checkups.
router.get('/users/:user/checkups', function(req, res, next){
  models.User.findOne({
    where: { id: req.params.user }
  }).then(user => {
    models.Checkup.findAll({
      where: { UserID: user.dataValues.id }
    })
    .then(checkups => { res.json(checkups); })
  });
})

//Get Individual User Checkup
//Find user.
//Find checkup.
//Respond with checkup.
router.get('/users/:user/checkups/:checkup', function(req, res, next){
  models.User.findOne({
    where: { id: req.params.user }
  })
  .then(user => {
    models.Checkup.findOne({
      where: {
        id: req.params.checkup,
        UserID: user.dataValues.id
      }
    })
    .then(checkup => { res.json(checkup); })
  });
})

module.exports = router;
