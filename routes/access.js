const express = require('express'),
      jwt     = require('express-jwt'),
      config  = require('../config');

// Validate access_token
exports.jwtCheck = function() {
  return jwt({
    secret: config.secret,
    audience: config.audience,
    issuer: config.issuer});
}

// Check for scope
exports.requireScope = function(scope) {
  return function (req, res, next) {
    var has_scopes = req.user.scope === scope;
    if (!has_scopes) {
      res.sendStatus(401);
      return;
    }
    next();
  };
}
