/**
 * Created by wenbotian on 5/3/17.
 */
var express = require('express');
var router = express.Router();
var Food = require('../schema/food');

router.get('/', function(req, res, next) {
    // req.query.name   /path?name=xx
    Food.find({'eater': req.query.name}, function(err, docs){

    });
    res.send('find sth');
});

router.post('/', function(req, res, next) {
    var food = new Food({
        restaurent: req.body.restaurent,
        price: req.body.price,
        eater: req.body.eater
    });
    food.save();
    res.send('food inited');
});

module.exports = router;

