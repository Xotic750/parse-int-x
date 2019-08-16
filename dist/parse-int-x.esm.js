import NAN from 'nan-x';
import toStr from 'to-string-x';
import trimLeft from 'trim-left-x';
import methodize from 'simple-methodize-x';
var nativeParseInt = parseInt;
/**  @type {Function} */

var castNumber = 0 .constructor;
var BAD_CHAR = "\u180E";
var methodizedCharAt = methodize(BAD_CHAR.charAt);
var hexRegex = /^[-+]?0[xX]/;
var methodizedTest = methodize(hexRegex.test);
/**
 * This method parses a string argument and returns an integer of the specified
 * radix (the base in mathematical numeral systems). (ES2019).
 *
 * @param {string} [string] - The value to parse. If the string argument is not a
 *  string, then it is converted to a string (using the ToString abstract
 *  operation). Leading whitespace in the string argument is ignored.
 * @param {number} [radix] - An integer between 2 and 36 that represents the radix
 *  (the base in mathematical numeral systems) of the above mentioned string.
 *  Specify 10 for the decimal numeral system commonly used by humans. Always
 *  specify this parameter to eliminate reader confusion and to guarantee
 *  predictable behavior. Different implementations produce different results
 *  when a radix is not specified, usually defaulting the value to 10.
 * @throws {TypeError} If target is a Symbol or is not coercible.
 * @returns {number} An integer number parsed from the given string. If the first
 *  character cannot be converted to a number, NaN is returned.
 */

var $parseInt = function $parseInt(string, radix) {
  var str = trimLeft(toStr(string));

  if (methodizedCharAt(str, 0) === BAD_CHAR) {
    return NAN;
  }

  return nativeParseInt(str, castNumber(radix) || (methodizedTest(hexRegex, str) ? 16 : 10));
};

export default $parseInt;

//# sourceMappingURL=parse-int-x.esm.js.map