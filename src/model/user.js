var mongoose = require('mongoose');
var userSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    date_birth: Date,
    access_ip: String,
    country_code: String,
    courses: Array
});
mongoose.model('user', userSchema);