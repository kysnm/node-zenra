var http = require('http')
  , querystring = require('querystring')
  , parser = require('libxml-to-js')
  , util = require('util')
  , emitter = require('events').EventEmitter
  , config = require('../config');

function Zenra() {
  emitter.call(this);
};
util.inherits(Zenra, emitter);
module.exports = Zenra;

Zenra.prototype.zenrize = function(sentence, cb){
  var self = this;

  self.on('zenrize', cb);
  
  var q = querystring.stringify({
      appid: config.appid
    , sentence: sentence
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
          throw error;
        } else {
          var words = result.ma_result.word_list.word;
          words.forEach(function(element, index, array) {
            if (element.pos === '動詞') {
              text += "全裸で" + element.surface;
            } else {
              text += element.surface;
            }
          });
          self.emit('zenrize', null, text);
          self.removeListener('zenrize', cb);
        }
      });
    });
  }).on('error', function(error) {
    console.log(error);
  });
  return self;
}

module.exports = Zenra;
