var log4js = require('log4js'),
    ses = require('node-ses'),
    Mailgun = require('mailgun-js'),
    fs = require('fs');

var clientAmazonSES = ses.createClient({
    key: 'AKIAIEC2EG263UM63IGQ',
    secret: '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'
});

var clientMailGun = new Mailgun({
    apiKey: 'key-4ffe5010ad22869d737a31e927120765',
    domain: 'sandbox83a59bf5d73e457eb41d1dfdea0e16c5.mailgun.org'
});

var logger = log4js.getLogger('EMAIL_SERVICE');

var FROM_EMAIL = 'franclisgaldino@gmail.com';

function EmailService() { }

EmailService.prototype.sendEmailByAmazonSES = function(user) {
    var template = buildEmailTemplate(user);
    var data = {
        to: user.email,
        from: FROM_EMAIL,
        subject: 'Purchase confirmation',
        message: template
    };

    clientAmazonSES.sendEmail(data, function (err) {
        if (err) {
            logger.error('[AMAZON-SES] - Failed to send email, details: \n', err);
        } else {
            logger.info('[AMAZON-SES] - Successfully sent email to', user.email)
        }
    });
};

EmailService.prototype.sendEmailByMailGun = function(user) {
    var template = buildEmailTemplate(user);
    var data = {
        from: FROM_EMAIL,
        to: user.email,
        subject: 'Purchase confirmation',
        html: template
    };
    clientMailGun.messages().send(data, function (err) {
        if (err) {
            logger.error('[MAILGUN] - Failed to send email, details: \n', err);
        } else {
            logger.info('[MAILGUN] - Successfully sent email to', user.email)
        }
    });
};

function buildEmailTemplate(user) {
    var template = fs.readFileSync('./src/views/email-template.html', 'utf8');
    template = template.replace(/USER_NAME/, user.name);
    template = template.replace(/COURSE_NAME/, user.course.title.replace('_',' '));
    template = template.replace(/COURSE_PRICE/, user.course.priceDiscount);
    // TODO Create custom link

    return template;
}


module.exports = new EmailService();


