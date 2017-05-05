/**
 * Created by wenbotian on 5/3/17.
 */
var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    name: String,
    password: String
});

var User = mongoose.model('user', userSchema);

module.exports = User;
