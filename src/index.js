const express = require('express');
const router = express.Router();
const storeRoute = require('./api/store/storeRoute');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

// Mount public store and product endpoints
router.use('/', storeRoute);

module.exports = router;
