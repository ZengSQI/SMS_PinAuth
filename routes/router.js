var express = require('express');
var router = express.Router();
var pa = require('../controllers/pa');

//routers
router.get('/', pa.index);
router.post('/create', pa.create);
router.post('/reqpin', pa.reqpin);
router.post('/verify', pa.verify);

module.exports = router;
