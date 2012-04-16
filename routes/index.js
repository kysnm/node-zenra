
/*
 * GET home page.
 */
var http = require('http')
  , querystring = require('querystring')
  , parser = require('libxml-to-js')
  , async = require('async')
  , Zenra = require('../lib/zenra');

exports.index = function(req, res){
  res.render('index', { title: 'Zenrize' });
};

exports.result = function(req, res){
  var zenra = new Zenra();
  zenra.zenrize(req.body.text, function(error, text) {
    res.render('result', { title:'Zenrize', text: text });
  });
}