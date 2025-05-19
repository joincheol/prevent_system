var express = require('express');
var router = express.Router();
const locationModel = require("../model/location");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get("/location", (req, res, next) => {
  locationModel.find({}, { _id: 0, __v: 0 }).then((result) => {
    console.log(result);
    res.json({
      message: "success",
      data: result,
    });
  }).catch((error) => {
    res.json({
      message: "error",
    });
  });
});

router.get('/support', function(req, res, next) {
  res.render("support");
});

router.get('/assist', function(req, res, next) {
  res.render("assist");
});

router.get('/news', function(req, res, next) {
  res.render("news");
});

module.exports = router;
