var chai = require('chai');
var expect = require('chai').expect;
var database = require(__dirname + '/../database.js');

describe('toSmallestDenomination', function() {
  it('converts currency to smallest denomination', function() {
    expect(database.toSmallestDenomination(10.00)).to.equal(1000);
  });
});
