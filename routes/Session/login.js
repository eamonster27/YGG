const express = require('express');
const router = express.Router();
const session = require('express-session');
const models = require('../../models');
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: false }));

router.get('/login', function(req, res){

})

router.post('/auth', function(req,res){
  // Authorize login stuff
  models.User.findOne({
    where: {
      email: req.body.email,
      password: req.body.password
    }
  }).then(function(user) {
    if(user) {
      session.user = user;
      res.redirect('/');
    }
    else {
      res.render('session/login', { error: true });
    }
  })
})

router.post("/logout", function(req,res){
  req.session.destroy(function(){
    session.user = null;
    res.redirect("/");
  })
})

module.exports = router;
