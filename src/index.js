/**
 * @module enum
 * @version 1.0.0
 * @desc Immutable Enum without any dependencies.
 * @example
 * Import `ES5`
 * ```js
const Enum = require('enum');
 * ```
 * Import `ES6`
 * ```js
import Enum from 'enum';
 * ```
 * @example
 * Create from array values:
 * ```js
const MyEnum = Enum([
    'FIRST',
    'SECOND',
]);
 * ```
 * Will return an immutable javascript object:
 * ```json
{
    "FIRST": "FIRST",
    "SECOND": "SECOND"
}
 * ```
 * _Note_: An error will be throw if you tried to modify the `Enum`.
 */
exports = module.exports = require('./Enum');
