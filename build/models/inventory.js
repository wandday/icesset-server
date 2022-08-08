"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateInventory = exports.getItemsInLocation = exports.findStoreByName = exports.findLocationById = exports.findItemByName = exports.findItemById = exports.findItem = exports.findAllLocations = exports.findAllItem = exports.createLocation = exports.createInventory = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _joi = require("joi");

var _index = require("../index");

var findItemByName = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(name) {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _index.pool.query('select * from inventory where name=?', [name]);

          case 2:
            return _context.abrupt("return", _context.sent);

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function findItemByName(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.findItemByName = findItemByName;

var findStoreByName = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(name) {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _index.pool.query('select * from locations where store_name=?', [name]);

          case 2:
            return _context2.abrupt("return", _context2.sent);

          case 3:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function findStoreByName(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

exports.findStoreByName = findStoreByName;

var findAllLocations = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _index.pool.query('select * from locations');

          case 2:
            return _context3.abrupt("return", _context3.sent);

          case 3:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function findAllLocations() {
    return _ref3.apply(this, arguments);
  };
}();

exports.findAllLocations = findAllLocations;

var findLocationById = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(storeId) {
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _index.pool.query('select * from locations where store_id=?', [storeId]);

          case 2:
            return _context4.abrupt("return", _context4.sent);

          case 3:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function findLocationById(_x3) {
    return _ref4.apply(this, arguments);
  };
}();

exports.findLocationById = findLocationById;

var findItemById = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(itemId) {
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return _index.pool.query('select * from items, quantity_location  where  items.item_id = quantity_location.item_id AND items.item_id=?', [itemId]);

          case 2:
            return _context5.abrupt("return", _context5.sent);

          case 3:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function findItemById(_x4) {
    return _ref5.apply(this, arguments);
  };
}();

exports.findItemById = findItemById;

var getItemsInLocation = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(storeId) {
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return _index.pool.query('select * from items INNER JOIN quantity_location ON items.item_id = quantity_location.item_id where quantity_location.store_id=?', [storeId]);

          case 2:
            return _context6.abrupt("return", _context6.sent);

          case 3:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function getItemsInLocation(_x5) {
    return _ref6.apply(this, arguments);
  };
}();

exports.getItemsInLocation = getItemsInLocation;

var findAllItem = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7() {
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return _index.pool.query('select * from items INNER JOIN quantity_location ON items.item_id = quantity_location.item_id ');

          case 2:
            return _context7.abrupt("return", _context7.sent);

          case 3:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));

  return function findAllItem() {
    return _ref7.apply(this, arguments);
  };
}();

exports.findAllItem = findAllItem;

var findItem = /*#__PURE__*/function () {
  var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(keyWord) {
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.next = 2;
            return _index.pool.query('select * from items INNER JOIN quantity_location ON items.item_id = quantity_location.item_id where items.item_name=?', [keyWord]);

          case 2:
            return _context8.abrupt("return", _context8.sent);

          case 3:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));

  return function findItem(_x6) {
    return _ref8.apply(this, arguments);
  };
}(); // export const deleteInventory = async (itemId) => {
//    return await pool.query('delete from inventory where item_id=?', [itemId])
// }
// export const createInventory = async (item) => {
//     console.log(item)
//     const {name, category, maker, model, description, quantity, item_condition, acquired, location, Image  } = item
//     return await pool.query('INSERT into inventory SET name=?, category=?, maker=?, model=?, description=?, quantity=?, item_condition=?, acquired=?, location=?, Image=?',  [name, category, maker, model, description, quantity, item_condition, acquired, location, Image])
//  }


exports.findItem = findItem;

var createInventory = /*#__PURE__*/function () {
  var _ref9 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(item) {
    var item_name, category, description, locations, result, lastIndex;
    return _regenerator["default"].wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            console.log(item);
            item_name = item.item_name, category = item.category, description = item.description, locations = item.locations;
            _context9.next = 4;
            return _index.pool.query('INSERT into items SET item_name=?, category=?, description=?', [item_name, category, description]);

          case 4:
            _context9.next = 6;
            return _index.pool.query('SELECT LAST_INSERT_ID()');

          case 6:
            result = _context9.sent;
            lastIndex = result[0][0]["LAST_INSERT_ID()"];
            console.log(locations);
            locations.forEach(function (el) {
              //console.log(e)
              _index.pool.query('INSERT into quantity_location SET item_id=?, store_id=?, quantity=?', [lastIndex, el.store_id, el.quantity]);
            });
            return _context9.abrupt("return", item);

          case 11:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9);
  }));

  return function createInventory(_x7) {
    return _ref9.apply(this, arguments);
  };
}(); // export const updateInventory = async (itemId, update) => {
//     console.log(update)
//     const {name, category, maker, model, description, quantity, item_condition, acquired, location, Image  } = update
//     return await pool.query('UPDATE inventory SET name=?, category=?, maker=?, model=?, description=?, quantity=?, item_condition=?, acquired=?, location=?, Image=? where item_id=?',  [name, category, maker, model, description, quantity, item_condition, acquired, location, Image, itemId ])
//  }


exports.createInventory = createInventory;

var updateInventory = /*#__PURE__*/function () {
  var _ref10 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10(itemId, update) {
    var item_name, category, description, locations;
    return _regenerator["default"].wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            item_name = update.item_name, category = update.category, description = update.description, locations = update.locations;
            _context10.next = 3;
            return _index.pool.query('UPDATE items SET item_name=?, category=?, description=? where item_id=?', [item_name, category, description, itemId]);

          case 3:
            locations.forEach(function (el) {
              _index.pool.query('UPDATE quantity_location SET store_id=?, quantity=? where item_id=?', [el.store_id, el.quantity, itemId]);
            });
            return _context10.abrupt("return", update);

          case 5:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10);
  }));

  return function updateInventory(_x8, _x9) {
    return _ref10.apply(this, arguments);
  };
}();

exports.updateInventory = updateInventory;

var createLocation = /*#__PURE__*/function () {
  var _ref11 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11(location) {
    var store_name;
    return _regenerator["default"].wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            console.log(location);
            store_name = location.store_name;
            _context11.next = 4;
            return _index.pool.query('INSERT into locations SET store_name=?', [store_name]);

          case 4:
            return _context11.abrupt("return", _context11.sent);

          case 5:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11);
  }));

  return function createLocation(_x10) {
    return _ref11.apply(this, arguments);
  };
}();

exports.createLocation = createLocation;