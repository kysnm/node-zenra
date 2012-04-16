var should = require('should')
  , Zenra = require('../lib/zenra');

describe('zenrize のテスト', function() {
  it('動詞の前に全裸がつく事', function(done) {
    var zenra = new Zenra;
    zenra.zenrize('起きたのでご飯を食べる', function(error, text) {
      text.should.equal('全裸で起きたのでご飯を全裸で食べる');
      done();
    });
  });
});