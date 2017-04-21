var mongoose = require('mongoose');

mongoose.model('course').find({}, function (err, blobs) {
    if (blobs.length === 0) {
        console.log("Creating defaults courses");

        mongoose.model('course').create({
                title: 'COURSE_BASIC',
                advantages: ['COURSE_ADVANTAGE', 'COURSE_ADVANTAGE', 'COURSE_ADVANTAGE', 'COURSE_ADVANTAGE'],
                price: 6.90
            }, function (err) {
                if (err) {
                    console.log(err)
                }
            });

        mongoose.model('course').create({
            title: 'COURSE_PREMIUM',
            advantages: ['COURSE_ADVANTAGE', 'COURSE_ADVANTAGE', 'COURSE_ADVANTAGE', 'COURSE_ADVANTAGE', 'COURSE_ADVANTAGE',
                'COURSE_ADVANTAGE', 'COURSE_ADVANTAGE', 'COURSE_ADVANTAGE', 'COURSE_ADVANTAGE', 'COURSE_ADVANTAGE'],
            price: 10.90
        }, function (err) {
            if (err) {
                console.log(err)
            }
        })
    }
});