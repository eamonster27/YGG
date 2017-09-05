const express = require('express');
const router = express.Router();
const models = require('../../models');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));

//create user ( add to database )
router.post('/create/user', function(req, res){
  console.log("posting to /create/user");
  models.User.create({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: req.body.password,
    cell: req.body.cell,
    passcode: req.body.passcode,
    paniccode: req.body.paniccode,
  })
  //After user create is initiated, persist session in "local-storage". On app start,
  //check local storage for session and auto login, otherwise direct to login/signup.
  // Very important that session persists permanently.
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
