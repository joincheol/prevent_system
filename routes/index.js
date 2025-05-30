var express = require('express');
var router = express.Router();
const locationModel = require("../model/location");
require('dotenv').config();

/* GET home page. */
router.get('/', function(req, res, next) {
  const apiKey = process.env.NAVER_API_KEY;
  res.render('index', { apiKey });
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

module.exports = router;
