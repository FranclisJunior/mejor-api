var mongoose = require('mongoose');
var courseSchema = new mongoose.Schema({
    title: String,
    advantages: Array,
    price: Number
});
mongoose.model('course', courseSchema);