const express = require('express');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');
const bodyParser = require('body-parser') ;


const passport = require('passport') ;
const passportStrategy = require('./utils/passportStrategy') ;

const authRoutes = require('./routes/authRoutes');
const blogRoutes = require('./routes/blogRoutes') ;
const userRoutes = require('./routes/userRoutes') ;
const scrapRoutes=require('./routes/scrapRoutes');
const redditRoutes=require('./routes/redditRoutes');
const twitterRoutes=require('./routes/twitterRouters')

const globalErrHandler = require('./controllers/errorController');
const AppError = require('./utils/appError');

passportStrategy(passport);

const app = express();

app.use(cors());
app.use(helmet());
const limiter = rateLimit({
    max: 10000,
    windowMs: 60 * 60 * 1000,
    message: 'Too Many Request from this IP, please try again in an hour'
});
app.use('/api', limiter);
app.use(express.json({
    limit: '15kb'
}));

app.use(mongoSanitize());
app.use(xss());
app.use(hpp());

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/api/auth', authRoutes) ;
app.use('/api/blog', blogRoutes) ;
app.use('/api/user', userRoutes) ;
app.use('/api/scrap', scrapRoutes) ;
app.use('/api/reddit', redditRoutes) ;
app.use('/api/twitter', twitterRoutes) ;

app.use('/api/files', express.static('uploads'));

app.use('*', (req, res, next) => {
    console.log(req.method);
    const err = new AppError(404, 'fail', 'undefined route');
    next(err, req, res, next);
});

app.use(globalErrHandler);

module.exports = app;