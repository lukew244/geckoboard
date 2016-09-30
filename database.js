var thinky = require('thinky')({db: 'geckoboard'});
var type = thinky.type;
var r = thinky.r;

var exchangeTable = thinky.createModel("exchangeTable", {
    id: type.string(),
    datetime: type.date(),
    buy: type.number(),
    sell: type.number(),
    last: type.number()
  });

module.exports = {

  saveBitcoinExchangeData: function saveData(data, currencyCode, callback) {
    var value = data[currencyCode];
    var entry = new exchangeTable({
      buy: toSmallestDenomination(value.buy),
      sell: toSmallestDenomination(value.sell),
      last: toSmallestDenomination(value.last),
      datetime: new Date().toISOString()
    });
    entry.save().then(function() {callback();});
  },

  getBitcoinExchangeData: function(callback) {
    var result = r.table('exchangeTable')
      .pluck("buy", "sell", "last", "datetime")
      .run().then(function(result) {
      callback(result);
    });
  },
};

function toSmallestDenomination(value) {
  return Math.round(value * 100);
}
