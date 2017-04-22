var mongoose = require('mongoose'),
    log4js = require('log4js');

var logger = log4js.getLogger('INITIAL_DB');

mongoose.model('course').find({}, function (err, blobs) {
    if (blobs.length === 0) {
        logger.info("Creating defaults courses");

        mongoose.model('course').create({
                title: 'COURSE_BASIC',
                advantages: ['COURSE_ADVANTAGE', 'COURSE_ADVANTAGE', 'COURSE_ADVANTAGE', 'COURSE_ADVANTAGE'],
                price: 6.90
            }, function (err) {
                if (err) {
                    logger.error(err);
                }
            });

        mongoose.model('course').create({
            title: 'COURSE_PREMIUM',
            advantages: ['COURSE_ADVANTAGE', 'COURSE_ADVANTAGE', 'COURSE_ADVANTAGE', 'COURSE_ADVANTAGE', 'COURSE_ADVANTAGE',
                'COURSE_ADVANTAGE', 'COURSE_ADVANTAGE', 'COURSE_ADVANTAGE', 'COURSE_ADVANTAGE', 'COURSE_ADVANTAGE'],
            price: 10.90
        }, function (err) {
            if (err) {
                logger.error(err);
            }
        })
    }
});