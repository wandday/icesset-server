"use strict";

var express = require('express');

var staffRouter = express.Router();
staffRouter.route('/').post(createStaff);
staffRouter.route('/:id').get('getStaff');
module.exports = router;