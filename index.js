
'use strict';

var postal = require('./lib/postal');
var random = require('randomstring');


var CABIN  = {
  random: random,
  postal: postal
};


// Exposes What?
module.exports = function (name) {
  return CABIN[name] || random;
};
