import $parseInt from 'src/parse-int-x';

const hasSymbol = typeof Symbol === 'function' && typeof Symbol('') === 'symbol';
const ifSymbolIt = hasSymbol ? it : xit;

describe('$parseInt', function() {
  const ws2016 =
    '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';
  const ws2018 =
    '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

  describe('basic', function() {
    it('$parseInt is a function', function() {
      expect.assertions(1);
      expect(typeof $parseInt).toBe('function');
    });
  });

  describe('$parseInt', function() {
    it('accepts a radix', function() {
      expect.assertions(35);
      for (let i = 2; i <= 36; i += 1) {
        expect($parseInt('10', i)).toBe(i);
      }
    });

    it('defaults the radix to 10 when the number does not start with 0x or 0X', function() {
      expect.assertions(4);
      ['01', '08', '10', '42'].forEach(function(str) {
        expect($parseInt(str)).toBe($parseInt(str, 10));
      });
    });

    it('defaults the radix to 16 when the number starts with 0x or 0X', function() {
      expect.assertions(2);
      expect($parseInt('0x16')).toBe($parseInt('0x16', 16));
      expect($parseInt('0X16')).toBe($parseInt('0X16', 16));
    });

    it('ignores leading whitespace', function() {
      expect.assertions(5);
      expect($parseInt('  0x16')).toBe($parseInt('0x16', 16));
      expect($parseInt('  42')).toBe($parseInt('42', 10));
      expect($parseInt('  08')).toBe($parseInt('08', 10));
      expect($parseInt(`${ws2018}08`)).toBe($parseInt('08', 10));
      expect($parseInt(`${ws2018}0x16`)).toBe($parseInt('0x16', 16));
    });

    it('leading whitespace 2018 should return NaN', function() {
      expect.assertions(2);

      expect(Number.isNaN($parseInt(`${ws2016}08`))).toBe(true);

      expect(Number.isNaN($parseInt(`${ws2016}0x16`))).toBe(true);
    });

    it('defaults the radix properly when not a true number', function() {
      expect.assertions(2);
      const fakeZero = {
        valueOf() {
          return 0;
        },
      };

      expect($parseInt('08', fakeZero)).toBe($parseInt('08', 10));
      expect($parseInt('0x16', fakeZero)).toBe($parseInt('0x16', 16));
    });

    it('allows sign-prefixed hex values', function() {
      expect.assertions(4);
      expect($parseInt('-0xF')).toBe(-15);
      expect($parseInt('-0xF', 16)).toBe(-15);
      expect($parseInt('+0xF')).toBe(15);
      expect($parseInt('+0xF', 16)).toBe(15);
    });

    it('naN parsing', function() {
      expect.assertions(4);
      expect($parseInt()).toBeNaN();
      expect($parseInt(undefined)).toBeNaN();
      expect($parseInt(null)).toBeNaN();
      expect($parseInt(NaN)).toBeNaN();
    });

    it('should throw if target is not coercible', function() {
      expect.assertions(1);
      expect(function() {
        $parseInt(Object.create(null));
      }).toThrowErrorMatchingSnapshot();
    });

    ifSymbolIt('should throw for Symbol', function() {
      expect.assertions(2);

      const sym = Symbol('foo');
      expect(function() {
        $parseInt(sym);
      }).toThrowErrorMatchingSnapshot();

      const symObj = Object(sym);
      expect(function() {
        $parseInt(Object(symObj));
      }).toThrowErrorMatchingSnapshot();
    });
  });
});
