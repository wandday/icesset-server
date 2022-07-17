const express = require('express')

const staffRouter = express.Router();

staffRouter
    .route('/')
    .post(createStaff);


staffRouter
    .route('/:id')
    .get('getStaff');


module.exports = router;

