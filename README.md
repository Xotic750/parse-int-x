<a href="https://travis-ci.org/Xotic750/parse-int-x"
   title="Travis status">
<img
   src="https://travis-ci.org/Xotic750/parse-int-x.svg?branch=master"
   alt="Travis status" height="18"/>
</a>
<a href="https://david-dm.org/Xotic750/parse-int-x"
   title="Dependency status">
<img src="https://david-dm.org/Xotic750/parse-int-x.svg"
   alt="Dependency status" height="18"/>
</a>
<a href="https://david-dm.org/Xotic750/parse-int-x#info=devDependencies"
   title="devDependency status">
<img src="https://david-dm.org/Xotic750/parse-int-x/dev-status.svg"
   alt="devDependency status" height="18"/>
</a>
<a href="https://badge.fury.io/js/parse-int-x" title="npm version">
<img src="https://badge.fury.io/js/parse-int-x.svg"
   alt="npm version" height="18"/>
</a>
<a name="module_parse-int-x"></a>

## parse-int-x

Parses a string argument and returns an integer of the specified radix.

### `module.exports(string, number)` ⇒ <code>number</code> ⏏

<a name="module_parse-int-x"></a>

### `parse-int-x` ⇒ <code>number</code>

This method parses a string argument and returns an integer of the specified
radix (the base in mathematical numeral systems). (ES2019)

**Kind**: static property of [<code>parse-int-x</code>](#module_parse-int-x)  
**Returns**: <code>number</code> - An integer number parsed from the given string. If the first
character cannot be converted to a number, NaN is returned.  
**Throws**:

- <code>TypeError</code> If target is a Symbol or is not coercible.

| Param  | Type                | Description                                                                                                                                                                                                                                                                                                                                                                                                                  |
| ------ | ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| string | <code>string</code> | The value to parse. If the string argument is not a string, then it is converted to a string (using the ToString abstract operation). Leading whitespace in the string argument is ignored.                                                                                                                                                                                                                                  |
| radix  | <code>number</code> | An integer between 2 and 36 that represents the radix (the base in mathematical numeral systems) of the above mentioned string. Specify 10 for the decimal numeral system commonly used by humans. Always specify this parameter to eliminate reader confusion and to guarantee predictable behavior. Different implementations produce different results when a radix is not specified, usually defaulting the value to 10. |

**Example**

```js
import $parseInt from 'parse-int-x';

// The following examples all return 15
console.log($parseInt(' 0xF', 16));
console.log($parseInt(' F', 16));
console.log($parseInt('17', 8));
console.log($parseInt(021, 8));
console.log($parseInt('015', 10)); // $parseInt(015, 10); will return 15
console.log($parseInt(15.99, 10));
console.log($parseInt('15,123', 10));
console.log($parseInt('FXX123', 16));
console.log($parseInt('1111', 2));
console.log($parseInt('15 * 3', 10));
console.log($parseInt('15e2', 10));
console.log($parseInt('15px', 10));
console.log($parseInt('12', 13));

//The following examples all return NaN:
console.log($parseInt('Hello', 8)); // Not a number at all
console.log($parseInt('546', 2)); // Digits are not valid for binary representations
```
