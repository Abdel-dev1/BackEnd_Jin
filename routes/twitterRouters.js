const express = require('express');
const router = express.Router();
const twitterController =require('./../controllers/twitterController');

router.get('/search', twitterController.search) ;
router.get('/callback', twitterController.callBackFunction) ;

module.exports = router; 