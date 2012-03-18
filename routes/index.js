
/*
 * GET home page.
 */
var http = require('http')
  , querystring = require('querystring')
  , parser = require('libxml-to-js')
  , async = require('async')
  , config = require('../config');

exports.index = function(req, res){
  res.render('index', { title: 'Zenrize' });
};

exports.result = function(req, res){
  var q = querystring.stringify({
      appid: config.appid
    , sentence: req.body.text
    , result: 'ma'
  });

  var options = {
      host: 'jlp.yahooapis.jp'
    , port: 80
    , path: '/MAService/V1/parse?' + q
  };

  http.get(options, function(response) {
    var text = ""
      , body = "";
    response.on('data', function(data) {
      body += data;
    });
    response.on('end', function() {
      parser(body, function(error, result) {
        if (error) {
          console.log(error);
        } else {
          var words = result.ma_result.word_list.word;
          words.forEach(function(element, index, array) {
            if (element.pos === '動詞') {
              text += "全裸で" + element.surface;
            } else {
              text += element.surface;
            }
          });
          res.render('result', { title:'Zenrize', text: text });
        }
      });
    });
  }).on('error', function(error) {
    console.log(error);
  });

}