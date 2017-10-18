'use strict';

var lib;
if (typeof module === 'object' && module.exports) {
  require('es5-shim');
  require('es5-shim/es5-sham');
  if (typeof JSON === 'undefined') {
    JSON = {};
  }
  require('json3').runInContext(null, JSON);
  require('es6-shim');
  var es7 = require('es7-shim');
  Object.keys(es7).forEach(function (key) {
    var obj = es7[key];
    if (typeof obj.shim === 'function') {
      obj.shim();
    }
  });
  lib = require('../../index.js');
} else {
  lib = returnExports;
}

var $parseInt = lib.parseInt;
var $parseInt2016 = lib.parseInt2016;
var $parseInt2018 = lib.parseInt2018;

var hasSymbol = typeof Symbol === 'function' && typeof Symbol('') === 'symbol';
var ifSymbolIt = hasSymbol ? it : xit;

describe('$parseInt', function () {
  var ws2016 = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';
  var ws2018 = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

  describe('basic', function () {
    it('$parseInt is a function', function () {
      expect(typeof $parseInt).toBe('function');
    });

    it('$parseInt2016 is a function', function () {
      expect(typeof $parseInt).toBe('function');
    });

    it('$parseInt is not $parseInt2016', function () {
      expect($parseInt).not.toBe($parseInt2016);
    });

    it('$parseInt not $parseInt2018', function () {
      expect($parseInt).toBe($parseInt2018);
    });
  });

  describe('$parseInt2016', function () {
    it('accepts a radix', function () {
      for (var i = 2; i <= 36; ++i) {
        expect($parseInt2016('10', i)).toBe(i);
      }
    });

    it('defaults the radix to 10 when the number does not start with 0x or 0X', function () {
      [
        '01',
        '08',
        '10',
        '42'
      ].forEach(function (str) {
        expect($parseInt2016(str)).toBe($parseInt2016(str, 10));
      });
    });

    it('defaults the radix to 16 when the number starts with 0x or 0X', function () {
      expect($parseInt2016('0x16')).toBe($parseInt2016('0x16', 16));
      expect($parseInt2016('0X16')).toBe($parseInt2016('0X16', 16));
    });

    it('ignores leading whitespace', function () {
      expect($parseInt2016('  0x16')).toBe($parseInt2016('0x16', 16));
      expect($parseInt2016('  42')).toBe($parseInt2016('42', 10));
      expect($parseInt2016('  08')).toBe($parseInt2016('08', 10));
      expect($parseInt2016(ws2016 + '08')).toBe($parseInt2016('08', 10));
      expect($parseInt2016(ws2016 + '0x16')).toBe($parseInt2016('0x16', 16));
    });

    it('defaults the radix properly when not a true number', function () {
      var fakeZero = {
        valueOf: function () {
          return 0;
        }
      };

      expect($parseInt2016('08', fakeZero)).toBe($parseInt2016('08', 10));
      expect($parseInt2016('0x16', fakeZero)).toBe($parseInt2016('0x16', 16));
    });

    it('allows sign-prefixed hex values', function () {
      expect($parseInt2016('-0xF')).toBe(-15);
      expect($parseInt2016('-0xF', 16)).toBe(-15);
      expect($parseInt2016('+0xF')).toBe(15);
      expect($parseInt2016('+0xF', 16)).toBe(15);
    });

    it('NaN parsing', function () {
      expect($parseInt2016()).toBeNaN();
      expect($parseInt2016(undefined)).toBeNaN();
      expect($parseInt2016(null)).toBeNaN();
      expect($parseInt2016(NaN)).toBeNaN();
    });

    it('should throw if target is not coercible', function () {
      expect(function () {
        $parseInt2016(Object.create(null));
      }).toThrow();
    });

    ifSymbolIt('should throw for Symbol', function () {
      var sym = Symbol('foo');
      expect(function () {
        $parseInt2016(sym);
      }).toThrow();

      var symObj = Object(sym);
      expect(function () {
        $parseInt2016(Object(symObj));
      });
    });
  });

  describe('$parseInt2018', function () {
    it('accepts a radix', function () {
      for (var i = 2; i <= 36; ++i) {
        expect($parseInt('10', i)).toBe(i);
      }
    });

    it('defaults the radix to 10 when the number does not start with 0x or 0X', function () {
      [
        '01',
        '08',
        '10',
        '42'
      ].forEach(function (str) {
        expect($parseInt(str)).toBe($parseInt(str, 10));
      });
    });

    it('defaults the radix to 16 when the number starts with 0x or 0X', function () {
      expect($parseInt('0x16')).toBe($parseInt('0x16', 16));
      expect($parseInt('0X16')).toBe($parseInt('0X16', 16));
    });

    it('ignores leading whitespace', function () {
      expect($parseInt('  0x16')).toBe($parseInt('0x16', 16));
      expect($parseInt('  42')).toBe($parseInt('42', 10));
      expect($parseInt('  08')).toBe($parseInt('08', 10));
      expect($parseInt(ws2018 + '08')).toBe($parseInt('08', 10));
      expect($parseInt(ws2018 + '0x16')).toBe($parseInt('0x16', 16));
    });

    it('leading whitespace 2016 should return NaN', function () {
      expect(Number.isNaN($parseInt(ws2016 + '08'))).toBe(true);
      expect(Number.isNaN($parseInt(ws2016 + '0x16'))).toBe(true);
    });

    it('defaults the radix properly when not a true number', function () {
      var fakeZero = {
        valueOf: function () {
          return 0;
        }
      };

      expect($parseInt('08', fakeZero)).toBe($parseInt('08', 10));
      expect($parseInt('0x16', fakeZero)).toBe($parseInt('0x16', 16));
    });

    it('allows sign-prefixed hex values', function () {
      expect($parseInt('-0xF')).toBe(-15);
      expect($parseInt('-0xF', 16)).toBe(-15);
      expect($parseInt('+0xF')).toBe(15);
      expect($parseInt('+0xF', 16)).toBe(15);
    });

    it('NaN parsing', function () {
      expect($parseInt()).toBeNaN();
      expect($parseInt(undefined)).toBeNaN();
      expect($parseInt(null)).toBeNaN();
      expect($parseInt(NaN)).toBeNaN();
    });

    it('should throw if target is not coercible', function () {
      expect(function () {
        $parseInt(Object.create(null));
      }).toThrow();
    });

    ifSymbolIt('should throw for Symbol', function () {
      var sym = Symbol('foo');
      expect(function () {
        $parseInt(sym);
      }).toThrow();

      var symObj = Object(sym);
      expect(function () {
        $parseInt(Object(symObj));
      });
    });
  });
});
