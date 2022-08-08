"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inventory = require("../models/inventory");

var InventoryController = /*#__PURE__*/function () {
  function InventoryController() {
    (0, _classCallCheck2["default"])(this, InventoryController);
  }

  (0, _createClass2["default"])(InventoryController, [{
    key: "createLocation",
    value: function () {
      var _createLocation2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(location) {
        var result, err, _result, _err;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return (0, _inventory.findStoreByName)(location.store_name);

              case 2:
                result = _context.sent;

                if (!(result[0].length > 0)) {
                  _context.next = 9;
                  break;
                }

                err = new Error(" ".concat(location.store_name, " already exist."));
                err.status = 400;
                throw err;

              case 9:
                _context.next = 11;
                return (0, _inventory.createLocation)(location);

              case 11:
                _result = _context.sent;

                if (!_result) {
                  _context.next = 16;
                  break;
                }

                return _context.abrupt("return", {
                  message: "Store created successfully."
                });

              case 16:
                _err = new Error("Unable to add location.");
                _err.status = 400;
                throw _err;

              case 19:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function createLocation(_x) {
        return _createLocation2.apply(this, arguments);
      }

      return createLocation;
    }()
  }, {
    key: "getAlllocations",
    value: function () {
      var _getAlllocations = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
        var result, err;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return (0, _inventory.findAllLocations)();

              case 2:
                result = _context2.sent;

                if (result) {
                  _context2.next = 9;
                  break;
                }

                err = new Error("Could not retrive stores");
                err.status = 400;
                throw err;

              case 9:
                return _context2.abrupt("return", result[0]);

              case 10:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function getAlllocations() {
        return _getAlllocations.apply(this, arguments);
      }

      return getAlllocations;
    }()
  }, {
    key: "getLocation",
    value: function () {
      var _getLocation = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(storeId) {
        var result, err;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return (0, _inventory.findLocationById)(storeId);

              case 2:
                result = _context3.sent;

                if (!(result[0].length < 1)) {
                  _context3.next = 9;
                  break;
                }

                err = new Error("The store with ID ".concat(storeId, "  does not exist"));
                err.status = 400;
                throw err;

              case 9:
                return _context3.abrupt("return", result[0][0]);

              case 10:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function getLocation(_x2) {
        return _getLocation.apply(this, arguments);
      }

      return getLocation;
    }()
  }, {
    key: "getItemsInLocation",
    value: function () {
      var _getItemsInLocation2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(storeId) {
        var result, err;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return (0, _inventory.getItemsInLocation)(storeId);

              case 2:
                result = _context4.sent;

                if (!(result[0].length < 1)) {
                  _context4.next = 9;
                  break;
                }

                err = new Error("The store with ID ".concat(storeId, "  does not exist"));
                err.status = 400;
                throw err;

              case 9:
                return _context4.abrupt("return", result[0]);

              case 10:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function getItemsInLocation(_x3) {
        return _getItemsInLocation2.apply(this, arguments);
      }

      return getItemsInLocation;
    }() // async createInventory(item){
    //     const result =  await findItemByName(item.name)
    //     if (result[0].length > 0){
    //      const err = new Error(` ${item.name} already exist.`);
    //      err.status = 400;
    //      throw err;
    //     } else {
    //      const result = await createInventory(item)
    //      if(result) {
    //          return {
    //              message: "Item added successfully."
    //          }
    //      }else {
    //          const err = new Error("Unable to add item.");
    //          err.status = 400;
    //          throw err;
    //      }
    //     }  
    // }

  }, {
    key: "createInventory",
    value: function () {
      var _createInventory2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(item) {
        var result, err;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return (0, _inventory.createInventory)(item);

              case 2:
                result = _context5.sent;

                if (!result) {
                  _context5.next = 7;
                  break;
                }

                return _context5.abrupt("return", {
                  message: "Item added successfully."
                });

              case 7:
                err = new Error("Unable to add item.");
                err.status = 400;
                throw err;

              case 10:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      function createInventory(_x4) {
        return _createInventory2.apply(this, arguments);
      }

      return createInventory;
    }()
  }, {
    key: "getAllInventory",
    value: function () {
      var _getAllInventory = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6() {
        var result, err;
        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return (0, _inventory.findAllItem)();

              case 2:
                result = _context6.sent;

                if (result) {
                  _context6.next = 9;
                  break;
                }

                err = new Error("Could not retrive inventory");
                err.status = 400;
                throw err;

              case 9:
                return _context6.abrupt("return", result[0]);

              case 10:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }));

      function getAllInventory() {
        return _getAllInventory.apply(this, arguments);
      }

      return getAllInventory;
    }()
  }, {
    key: "getInventory",
    value: function () {
      var _getInventory = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(itemId) {
        var result, err;
        return _regenerator["default"].wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return (0, _inventory.findItemById)(itemId);

              case 2:
                result = _context7.sent;

                if (!(result[0].length < 1)) {
                  _context7.next = 9;
                  break;
                }

                err = new Error("Could not retrive item with ID  ".concat(itemId));
                err.status = 400;
                throw err;

              case 9:
                return _context7.abrupt("return", result[0]);

              case 10:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7);
      }));

      function getInventory(_x5) {
        return _getInventory.apply(this, arguments);
      }

      return getInventory;
    }()
  }, {
    key: "updateInventory",
    value: function () {
      var _updateInventory2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(itemId, update) {
        var result, err, response;
        return _regenerator["default"].wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.next = 2;
                return (0, _inventory.findItemById)(itemId);

              case 2:
                result = _context8.sent;

                if (!(result[0].length < 1)) {
                  _context8.next = 9;
                  break;
                }

                err = new Error("Item number ".concat(itemId, "  does not exist in this inventory."));
                err.status = 400;
                throw err;

              case 9:
                _context8.next = 11;
                return (0, _inventory.updateInventory)(itemId, update);

              case 11:
                response = _context8.sent;

                if (!response) {
                  _context8.next = 14;
                  break;
                }

                return _context8.abrupt("return", {
                  response: response
                });

              case 14:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8);
      }));

      function updateInventory(_x6, _x7) {
        return _updateInventory2.apply(this, arguments);
      }

      return updateInventory;
    }()
  }, {
    key: "findItem",
    value: function () {
      var _findItem2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(keyWord) {
        var result, err;
        return _regenerator["default"].wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _context9.next = 2;
                return (0, _inventory.findItem)(keyWord);

              case 2:
                result = _context9.sent;

                if (!(result[0].length < 1)) {
                  _context9.next = 9;
                  break;
                }

                err = new Error("Could not retrive ".concat(keyWord));
                err.status = 400;
                throw err;

              case 9:
                return _context9.abrupt("return", result[0]);

              case 10:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9);
      }));

      function findItem(_x8) {
        return _findItem2.apply(this, arguments);
      }

      return findItem;
    }() // async deleteInventory(itemId){
    //     const result = await findItemById(itemId)
    //     if (result[0].length < 1){
    //         const err = new Error(`Item number ${itemId}  does not exist in this inventory.`);
    //         err.status = 400;
    //         throw err;
    //     }
    //     else {
    //         const response = await deleteInventory(itemId)
    //         if(response) {
    //             return {response}
    //             }
    //     } 
    // }

  }]);
  return InventoryController;
}();

exports["default"] = InventoryController;