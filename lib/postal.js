
'use strict';

var random  = require('randomstring');



// Expose Postal
var exports = module.exports = {};


// Digital Seed
var FIELDS = [8, 6, 4, 2, 3, 5, 9, 7];
// White List Setting By Whitelist
var WHITELIST = [];


/**
 * 生成带校验位的9为随机数字
 *
 * @return {Number}
 */
exports.generate = function () {
  var origin, number, year;

  origin = random.generate({
    length: 7,
    charset: 'numeric'
  });
  year = new Date().getYear() % 100;

  if (year % 10 === 0) { year +=1; }

  origin = '' + (year % 10) + origin;
  year = parseInt(year / 10);
  number = year + origin + calcChecksum(origin);

  return number;
};


/**
 * 校验带校验位的数字是否正确
 *
 * @param  {Number} number 待校验的数字
 * @return {Booble}
 */
exports.check = function (number) {
  var origin, checkDigit;

  number = Number(number);
  if (!number || ('' + number).length !== 10) {
    return false;
  }

  // 看看是否在白名单列表里
  if (WHITELIST.indexOf(number) !== -1) {
    return true;
  }

  checkDigit = number % 10;
  origin = parseInt(number / 10);
  origin = origin % 100000000;

  return calcChecksum(origin) === checkDigit;
};


exports.whitelist = function (numbers) {
  if (isArray(numbers)) {
    WHITELIST = numbers;
  }
};


/**
 * 采用国际邮件编号校验位算法计算数字的校验位
 *
 * @param  {Number} number 待计算校验位的数字
 * @return {Number}
 */
function calcChecksum (number) {
  var code, numbers, sum = 0;

  if (!number || ('' + number).length !== 8) {
    return NaN;
  }

  numbers = String(number).split('');
  numbers.forEach(function (value, index) {
    sum += (value * FIELDS[index]);
  });
  code = sum % 11;

  return code === 0 ? 5 : (code === 1 ? 0 : 11 - code);
}

function isArray (obj) {
  var type = Object.prototype.toString.call(obj);

  return /array/i.test(type);
}
