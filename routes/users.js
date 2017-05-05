var express = require('express');
var router = express.Router();
var User = require('../schema/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/', function(req, res, next) {
  // console.log(req);
  console.log(req.body.name);
  console.log(req.body.passwd);
  User.findOne({'name': req.body.name}, function(err, doc){
    console.log(doc);
    if(doc == null) {
      res.json({res:false})
    }
    else if(doc.password == req.body.passwd){
      res.json({res:true})
    }
    else{
      res.json({res:false})
    }
  });
  // res.send('respond with a resource');
  // res.json({data:[{name:'abc', quantity:'12', price:'111'},{name:'zxc', quantity:'x', price:'127'}]});
});

module.exports = router;
