var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    log4js = require('log4js');

var logger = log4js.getLogger('COURSES');

router.route('/')
    .get(function(req, res, next) { //GET all courses
        //retrieve all courses from Monogo
        mongoose.model('course').find({}, function (err, courses) {
            if (err) {
                logger.error('Unable to retrieve courses \n', err);
                res.status(500).send({ error: 'Unable to retrieve courses' });
            } else {
                logger.info('Get all courses');
                res.json(courses);
            }
        });
    });

module.exports = router;