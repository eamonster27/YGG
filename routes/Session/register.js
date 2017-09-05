const express = require('express');
const router = express.Router();
const session = require('express-session');
const models = require('../../models');
const bodyParser = require('body-parser');

router.get('/signup', function(req, res){

})

router.post('/signup', function(req, res){
  models.User.findOne({
    where: {
      email: req.body.email
    }
  }).then(function(user) {
    if(user) {
      //Error email already taken
    }
    else {
      models.User.create({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        cell: req.body.cell,
        password: req.body.password,
        passcode: req.body.passcode,
        paniccode: req.body.paniccode
      }).then(function (user){
        if(user) {
          session.user = user;
          //redirect
        }
      }).catch(function(error){
        //render with errors.
        /*
        res.render("userEdit", {
        user: user,
        errors: error.errors
      })
      */
      })
    }
  })
})



module.exports = router;
