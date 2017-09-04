const express = require('express');
const router = express.Router();
const session = require('express-session');
const models = require('../../models');
const bodyParser = require('body-parser');

router.get('/signup', function(req, res){

})

router.post('/signup', function(req, res){
  if(req.body.username == '' || req.body.password == ''){
    //Error. Use validation instead
  }
  else {
    models.User.findOne({
      where: {
        email: req.body.email
      }
    }).then(function(user) {
      if(user) {
        //Error
      }
      else {
        models.User.create({
          username: req.body.username,
          password: req.body.password
        }).then(function (user){
          if(user) {
            session.user = user;
            res.redirect('/');
          }
        })
      }
    })
  }
})



module.exports = router;
