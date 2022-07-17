"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pool = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _expressValidation = require("express-validation");

var _UserRouter = _interopRequireDefault(require("./api/UserRouter"));

var express = require('express');

var app = express();
app.use(express.json());

var bcrypt = require('bcryptjs');

app.use(express.json());

var mysql = require('mysql2/promise');

var dotenv = require('dotenv');

dotenv.config();
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use("/api/v1", _UserRouter["default"]);
app.use(function (err, request, response, next) {
  if (err instanceof _expressValidation.ValidationError) {
    return response.status(err.statusCode).json(err);
  }

  response.status(err.status || 500);
  response.json({
    code: err.code,
    message: err.message
  });
}); // DATABASE SETTINGS

var pool = mysql.createPool({
  host: process.env.host,
  user: process.env.user,
  database: process.env.database,
  password: process.env.password,
  waitForConnections: process.env.waitForConnections,
  connectionLimit: process.env.connectionLimit,
  queueLimit: process.env.queueLimit
});
exports.pool = pool;

if (pool.state === 'disconnected') {
  console.log("Server Down");
} else {
  console.log("Connected to database");
} //Hashing Password


var hashPassword = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(userPassword) {
    var convertedUserPassword, harshPassword;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            convertedUserPassword = userPassword.toString();
            _context.next = 3;
            return bcrypt.hash(convertedUserPassword, 10);

          case 3:
            harshPassword = _context.sent;
            return _context.abrupt("return", harshPassword);

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function hashPassword(_x) {
    return _ref.apply(this, arguments);
  };
}(); // END POINTS  
// CREATE USER END POINT


app.post('/api/users', /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var _validateUsers, error, _req$body, firstName, lastName, mobilePhone, email, password, role, harshedPassword, userExist, result;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _validateUsers = validateUsers(req.body), error = _validateUsers.error;

            if (!error) {
              _context2.next = 3;
              break;
            }

            return _context2.abrupt("return", res.status(400).send({
              error: error.details[0].message
            }));

          case 3:
            _req$body = req.body, firstName = _req$body.firstName, lastName = _req$body.lastName, mobilePhone = _req$body.mobilePhone, email = _req$body.email, password = _req$body.password, role = _req$body.role;
            _context2.prev = 4;
            _context2.next = 7;
            return hashPassword(password);

          case 7:
            harshedPassword = _context2.sent;
            _context2.next = 10;
            return pool.query('select email from users where email=?', [email]);

          case 10:
            userExist = _context2.sent;

            if (!(userExist[0].length > 0)) {
              _context2.next = 15;
              break;
            }

            res.status(400).send('User already exist');
            _context2.next = 20;
            break;

          case 15:
            _context2.next = 17;
            return pool.query('INSERT into users SET firstName=?, lastName=?, mobilePhone=?, email=?, password=?, role=?', [firstName, lastName, mobilePhone, email, harshedPassword, role]);

          case 17:
            result = _context2.sent;
            console.log(result[0]);
            res.send(result[0]);

          case 20:
            _context2.next = 26;
            break;

          case 22:
            _context2.prev = 22;
            _context2.t0 = _context2["catch"](4);
            console.log(_context2.t0);
            res.status(500).send(_context2.t0);

          case 26:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[4, 22]]);
  }));

  return function (_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}()); //GETTING INDIVIDUAL STAFF

app.get('/api/users/:id', /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var userId, singleUser;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            userId = req.params.id;
            _context3.next = 4;
            return pool.query('select * from users where user_id=?', [userId]);

          case 4:
            singleUser = _context3.sent;

            if (singleUser[0].length < 1) {
              res.status(400).send('User does not exist');
            } else res.status(200).send({
              message: "User fetched sucessfully",
              data: singleUser[0][0]
            });

            _context3.next = 11;
            break;

          case 8:
            _context3.prev = 8;
            _context3.t0 = _context3["catch"](0);
            res.status(500).send({
              message: "errro occured",
              data: _context3.t0
            });

          case 11:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 8]]);
  }));

  return function (_x4, _x5) {
    return _ref3.apply(this, arguments);
  };
}());
var port = process.env.PORT || 3000;
app.listen(port, function () {
  return console.log("Listening on port ".concat(port, "..."));
});