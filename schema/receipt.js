/**
 * Created by wenbotian on 5/3/17.
 */
/**
 * Created by 67271 on 5/3/2017.
 */

var mongoose = require('mongoose');

var billSchema = new mongoose.Schema({
    name: String,
    restaurant: String,
    price: String,
    judge: Number
});

var Bill = mongoose.model('bill', billSchema);

module.exports = Bill;
