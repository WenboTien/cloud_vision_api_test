/**
 * Created by wenbotian on 5/3/17.
 */
var mongoose = require('mongoose');

var foodSchema = new mongoose.Schema({
    restaurent: String,
    price: String,
    eater: String

});

var Food = mongoose.model('food', foodSchema);

module.exports = Food;