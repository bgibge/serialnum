/* globals describe, it */

'use strict';

var builder     = require('..')('postal');
var chalk       = require('chalk-console');
var fs          = require('fs');
var should      = require('should');



describe('random-number', function () {
  describe('#generate()', function () {
    it('should return random number with checksum and pass checking', function () {
      var number1 = builder.generate()
        , number2 = builder.generate()
        , number3 = builder.generate();

      chalk.info('      the 1st random number: ' + number1);
      should(builder.check(number1)).be.exactly(true);
      chalk.info('      the 2nd random number: ' + number2);
      should(builder.check(number2)).be.exactly(true);
      chalk.info('      the 3rd random number: ' + number3);
      should(builder.check(number3)).be.exactly(true);
    });
  });

  describe('#check()', function () {
    it('should return true for number which has passed checking', function () {
      var numbers = fs.readFileSync('./__test__/correct.txt', 'utf8').split(',');

      builder.whitelist([1609297945, 1611447483]);

      chalk.info('      the test numbers: ' + numbers);
      numbers.forEach(function (number) {
        should(builder.check(number)).be.exactly(true);
      });
    });
  });

  describe('#check()', function () {
    it('should return false for number which has not passed checking', function () {
      var numbers = fs.readFileSync('./__test__/mistake.txt', 'utf8').split(',');

      chalk.info('      the test numbers: ' + numbers);
      numbers.forEach(function (number) {
        should(builder.check(number)).be.exactly(false);
      });
    });
  });
});
