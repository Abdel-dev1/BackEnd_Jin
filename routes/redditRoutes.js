const express = require('express');
const passport = require('passport');
const router = express.Router();
const redditController =require('./../controllers/redditController');

router.post('/search', redditController.search) ;
router.post('/search_subreddit', redditController.searchSubReddit) ;
router.post('/DM', redditController.DM) ;

router.get('/refresh_token', redditController.redditRefresh_token) ;
router.get('/authorize', redditController.OAuth2)
router.get('/token*', redditController.reddittoken) ;
router.get('/comments', redditController.comments) ;
router.get('/test', redditController.test) ;
router.get('/*',passport.authenticate('jwt', { session: true }))
module.exports = router; 