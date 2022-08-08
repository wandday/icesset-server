"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hasRole = void 0;

var _TokenController = _interopRequireDefault(require("../controller/TokenController"));

// import { response } from "express";
var tokenController = new _TokenController["default"]();

var hasRole = function hasRole(role, request, response, next) {
  return function (request, response, next) {
    var bearerHeader = request.headers.authorization;

    if (typeof bearerHeader !== "undefined") {
      var bearerToken = bearerHeader.split(" ");
      var token = bearerToken[1];

      if (token) {
        tokenController.verifyToken(token).then(function (user) {
          console.log("role is", role);

          if (user.role == role) {
            request.body.user = user;
            if (request.body.user.email) request.body.email = request.body.user.email;
            console.log(user);
            next();
          } else {
            var err = new Error("Access Denied");
            err.status = 403;
            next(err);
          }
        })["catch"](function (err) {
          console.log(err);
          next(err);
        });
      } else {
        var err = new Error('You need authentication to access this resource');
        err.status = 401;
        next(err);
      }
    } else {
      var _err = new Error('You need authentication to access this resource');

      _err.status = 401;
      next(_err);
    }
  };
};

exports.hasRole = hasRole;