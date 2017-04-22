var cookieParser = require('cookie-parser'),
    cors = require('cors'),
    express = require('express'),
    log4js = require('log4js'),
    path = require('path');


// Define DB and Logger
var db = require('./src/util/db'),
    course = require('./src/model/course'),
    user = require('./src/model/user'),
    initial_insert = require('./src/util/initial.db.insert');

// Define Controllers
var index = require('./src/controllers/index'),
    courses = require('./src/controllers/courses'),
    users = require('./src/controllers/users');

var app = express();

// Controllers setup
app.use('/', index);
app.use('/api/courses', courses);
app.use('/api/users', users);

// View engine setup
app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'jade');


// Looger setup
log4js.configure({
    appenders: [
        { type: 'console' },
        { type: 'file', filename: 'logs/mejor-api.log', "maxLogSize": 1e+7}
    ]
});

// Others setups
app.use(cors());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// Catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// Development error handler will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// Production error handler no stacktraces leaked to user
app.use(function(err, req, res) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;