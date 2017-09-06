const express = require('express');
const router = express.Router();
const models = require('../models');

//Get All User Checkups
router.get('/users/:user/checkups', function(req, res, next){
  //Find user.
  //Find all user checkups.
  //Respond with checkups.
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
router.get('/users/:user/checkups/:checkup', function(req, res, next){
  //Find user.
  //Find checkup.
  //Respond with checkup.
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
