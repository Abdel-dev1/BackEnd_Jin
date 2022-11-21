const express = require('express');
const router = express.Router();
const redditController =require('./../controllers/redditController');

router.post('/search', redditController.search) ;
router.post('/search_subreddit', redditController.searchSubReddit) ;
router.post('/DM', redditController.DM) ;
router.get('/refresh_token', redditController.redditRefresh_token) ;

router.get('/authorize', redditController.OAuth2)
router.get('/token*', redditController.reddittoken) ;
router.get('/comments', redditController.comments) ;

module.exports = router; 