const express = require('express');
const router = express.Router();
const models = require('../models');

//create user ( add to database )
router.post('/create/user', function(req, res){
  models.User.create({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    cell: req.body.cell,
    passcode: req.body.passcode,
    paniccode: req.body.paniccode,
  })

})

//edit user (panic code, pass code)
//delete user

module.exports = router;


//   models.User.findOne({
//     where: {id: req.params.user},
//     include: [
//       {model: models.Checkin, as: 'Checkins'},
//       {model: models.Checkup, as: 'Checkups'}]
//   })
//   .then(user => { res.json(user); });
