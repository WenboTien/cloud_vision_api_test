var express = require('express');
var fs = require('fs');
var router = express.Router();
var multer = require('multer');
var gm = require('gm')
graphicsMagick = gm.subClass({imageMagick: true});
const Vision = require('@google-cloud/vision');
// var upload = multer({ dest: './'});

var uploadFolder = './';

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadFolder);
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '.jpg');
    }
});

var upload = multer({storage: storage});

var dataProcess = function(data){
    var datalist = data.split('\n');
    var floatList = [];
    var nameList = [];
    var floatReg = /^\d+(\.\d+)?$/;

    for(var i=0; i<datalist.length; i++){
        if(datalist[i].indexOf('.') > 0&& floatReg.test(datalist[i].replace(/\s/g, ""))){
            floatList.push(datalist[i].replace(/\s/g, ""));
        }
    }
    console.log(floatList);
    var lenFloatList= floatList.length;

    if(parseFloat(floatList[lenFloatList - 1]) === parseFloat(floatList[lenFloatList - 2]) + parseFloat(floatList[lenFloatList - 3])){
        var lenFood = lenFloatList - 3;
        var count = 0;
        var index = 0;
        for(i=0; i<datalist.length; i++){
            if(datalist[i].indexOf('.') > 0 && floatReg.test(datalist[i].replace(/\s/g, ""))){
                index = i;
                break;
            }
        }

        for(i=index-1; i>0; i--){
            if(datalist[i].length > 3){
                nameList.unshift(datalist[i]);
                count+=1;
            }
            if(count === lenFood) break;
        }

        console.log(nameList);
        var d = [];
        for(i = 0; i < nameList.length; i++ ){
            d.push({name: nameList[i], quantity: '1', price: floatList[i]});
        }

        return {data:d, sub:floatList[floatList.length-3], tax:floatList[floatList.length-2],total:floatList[floatList.length-1],restaurant:datalist[0], res:'true'};
    }
    return {res:'false'};

};

router.get('/', function(req, res, next) {
  // res.send('respond with a resource');


    var config = {
        projectId: 'node-vision',
        keyFilename: './node-vision.json'
    };
    const Vision = require('@google-cloud/vision');
    const vision = Vision(config);
    const fileName = './image.jpg';
    var options = {
        types:['text']
    };

    vision.readDocument(fileName, options).then(
        function(data){
            const results = data[1].responses[0].fullTextAnnotation;
            // console.log(results.text);
            var result = dataProcess(results.text);
            console.log(result);
            res.json(result);
        }).catch(function (err) {
            res.json({res:'false'});
        });

    // (data) => console.log(data[1].responses[0].fullTextAnnotation.text)

});

router.post('/', upload.single('image'),function(req, res, next) {
  // res.end('save');
  var file = req.file;
  console.log(req.file);

    graphicsMagick('./image.jpg')
        .rotate('white',90)
        .resize(400, null)
        .quality(70)
        .write('./image.jpg', function (err) {
            if (!err) console.log('Image resized');
        });

  // var config = {
  //     projectId: 'node-vision',
  //     keyFilename: './node-vision.json'
  // };
  // const Vision = require('@google-cloud/vision');
  // const vision = Vision(config);
  // const fileName = './image.jpg';
  // var options = {
  //     types:['text']
  // };
  //
  // vision

  // fs.renameSync(file.upload.path, "./"+file.upload.originalname);
  // console.log(req.body.image);
  // fs.writeFile("./1.jpg", req.file, function(err){});
  // fs.createReadStream(req.body.image).pipe(fs.createWriteStream("./1.jpg"));
});


router.post('/2/', upload.single('image'),function(req, res, next) {
    // res.end('save');
    var file = req.file;
    console.log(req.file);

    graphicsMagick('./image.jpg')
        .resize(400, null)
        .quality(70)
        .write('./image.jpg', function (err) {
            if (!err) console.log('Image resized');
        });
});


module.exports = router;
