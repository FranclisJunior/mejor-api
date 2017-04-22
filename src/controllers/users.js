var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'), //parses information from POST
    log4js = require('log4js'),
    emailService = require('../util/email.service');

var logger = log4js.getLogger('USERS');

router.use(bodyParser.json({ extended: true }));

//Enable CORS
router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

router.route('/')
    .post(function(req, res) {
        logger.info('Request to create user: ', req.body.email);

        // TODO validate required fields
        mongoose.model('user').create({
            name : req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            date_birth: req.body.date_birth,
            access_ip: req.body.access_ip,
            country_code: req.body.country_code,
            courses: [req.body.course._id]
        }, function (err, user) {
            if (err) {
                logger.error('Error on create user : \n', err);
            } else {
                logger.info('User created with id: ', user._id);
                user.course = req.body.course;
                emailService.sendEmailByAmazonSES(user);
                res.json(user);
            }
        })
    });

module.exports = router;