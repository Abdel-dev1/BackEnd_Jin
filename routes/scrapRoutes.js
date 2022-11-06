const express = require('express');
const router = express.Router();
const scrapController =require('./../controllers/scrapController');

router.post('/test', scrapController.testNavigation) ;


module.exports = router;