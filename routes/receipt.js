/**
 * Created by wenbotian on 5/3/17.
 */
var express = require('express');
var router = express.Router();
var Bill = require('../schema/receipt');

router.get('/', function(req, res, next) {
    Bill.find({'name': req.query.name}, function(err, docs){
        console.log(docs);
        res.json({data: docs})
    });
    res.send('respond with a resource');
});

router.post('/', function(req, res, next) {
    var bill = new Bill({
        name: req.body.name,
        restaurant: req.body.restaurant,
        price: req.body.price,
        judge: parseInt(req.body.judge)
    });
    bill.save();
    res.send('receipt inited');
});

module.exports = router;
