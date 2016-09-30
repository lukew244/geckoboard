var request = require('request');
var database = require(__dirname + '/database.js');
var geckoboard = require(__dirname + '/geckoboard.js');

var URL = 'https://blockchain.info/ticker';
var UPDATE_INTERVAL = 900000;
var CURRENCY_CODE = 'USD';

//Update on initialise...
requestDataFromThirdParty(processResponse);

//And then every interval
setInterval(function() {
  requestDataFromThirdParty(processResponse);
}, UPDATE_INTERVAL);


function requestDataFromThirdParty(callback) {
  request.get(URL, function(error, response, body) {
    if(error) {
      return console.log('Error: ', error);
    }
    if(response.statusCode !== 200) {
      return console.log('Invalid status code returned: ', response.statusCode);
    }
    callback(body);
  });
}

function processResponse (response) {
  var parsed = JSON.parse(response);
  database.saveBitcoinExchangeData(parsed, CURRENCY_CODE, updateGeckoboard);
}

function updateGeckoboard() {
  database.getBitcoinExchangeData(geckoboard.prepareData);
}
