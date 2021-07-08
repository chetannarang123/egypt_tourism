var express = require('express');
var router = express.Router();
var im = require('imagemagick');
var path = require('path');
var sizeOf = require('image-size');
var res_height = 10800;
var res_width = 19200;
var fs = require("fs");


router.get('/', function (req, res, next) {
  var message = '';
  var sql = "SELECT * FROM `images`";
  db.query(sql, function (err, result) {
    if (result.length <= 0) {
      message = "No Images in database";
      res.render('index', { title: 'Express', message: message });
    }
    else {
      console.log(result)
      res.render('index', { title: 'Express', message: message, data: result });
    }


    //res.render('profile.ejs',{data:result, message: message});
  });


});

router.post('/', function (req, res, next) {
  message = '';
  if (req.method == "POST") {

    if (!req.files)
      return res.status(400).send('No files were uploaded.');

    var file = req.files.uploaded_image;
    var img_name = file.name;


    if (file.mimetype == "image/jpeg" || file.mimetype == "image/png" || file.mimetype == "image/gif") {
      console.log("we are here", img_name)
      file.mv('public/upload_images/' + file.name, function (err) {

        if (err) {
          console.log(err)
          return res.status(500).send(err);
        }

        else {
          var dimensions = sizeOf('public/upload_images/' + file.name);
          console.log(dimensions.width, dimensions.height);
          if (dimensions.width <= res_width && dimensions.height <= res_height) {
            console.log('we reached here')

            var img = {
              img: fs.readFileSync('public/upload_images/' + file.name),
              image_name: file.name
          };

            query = db.query('INSERT INTO images SET ?', img, function(err,
              result) {
                if(err){
                  console.log(err)
                }else{
                  res.redirect('/');
                  console.log(result)
                }
              
          });

          }
          else {
            message = "This resolution is too large please use the image in resolution of 1920 * 1080'";
            res.render('index.ejs', { message: message });
          }

        }

      });
    } else {
      message = "This format is not allowed , please upload file with '.png','.gif','.jpg'";
      res.render('index.ejs', { message: message });
    }

  } else {
    res.render('index');
  }
});


router.get('/history', function(req, res, next) {
  res.render('history');
});

router.get('/famousplaces', function(req, res, next) {
  res.render('famousplaces');
});

router.get('/restaurants', function(req, res, next) {
  res.render('restaurants');
});

router.get('/economy', function(req, res, next) {
  res.render('economy');
});
router.get('/geography', function(req, res, next) {
  res.render('geography');
});


module.exports = router;

//"data:image/png;base64,<%=data[i].img.toString('base64')%>"
