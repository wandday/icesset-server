"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _express = require("express");

var _expressValidation = require("express-validation");

var _validation = require("../validation");

var _UserController = _interopRequireDefault(require("../controller/UserController"));

var router = (0, _express.Router)();
var userController = new _UserController["default"]();
router.post("/users", //middleware
(0, _expressValidation.validate)(_validation.validUser),
/*#__PURE__*/
// hasRole(ADMINISTRATOR),
function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var result;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return userController.createUser(req.body);

          case 3:
            result = _context.sent;
            res.status(201).json({
              message: "User created successfully",
              data: result
            });
            _context.next = 10;
            break;

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            next(_context.t0);

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 7]]);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}());
var _default = router;
exports["default"] = _default;