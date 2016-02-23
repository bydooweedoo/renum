'use strict';

/**
 * @alias module:enum
 * @example
 * From `ES6` string:
 * ```js
import Enum from 'enum';

export default Enum('FIRST SECOND');
```
* Which equals to:
```js
import Enum from 'enum';

export default Enum(`
    FIRST
    SECOND
`);
 * ```
 * @param {Object|Array|Map|Set|...String} values Input arguments.
 * @return {Object} Frozen object corresponding to given arguments.
 */
function Enum (values) {

    const length = arguments.length;

    if (values instanceof Array) {
        return EnumFromArray(values);
    } else if (values instanceof Map) {
        return EnumFromMap(values);
    } else if (values instanceof Set) {
        return EnumFromSet(values);
    } else if (length === 1 && typeof values === 'string') {
        return EnumFromString(values);
    } else if (typeof values === 'object') {
        return EnumFromObject(values);
    } else {
        return EnumFromArgs(arguments);
    }
    return values;
}

function EnumValue (value) {
    const obj = {};

    obj[value] = value;
    return obj;
}

function EnumItem (key, value) {
    const obj = {};

    obj[key] = value;
    return obj;
}

function EnumFromObject (obj) {
    return Object.freeze(obj);
}

function EnumFromArgs (args) {
    return EnumFromArray(Array.from(args));
}

function EnumFromArgsSafe (args) {
    return EnumFromObject(Object.keys(args).reduce(
        (obj, key) => Object.assign(obj, EnumValue(args[key])), {}
    ));
}

function EnumFromArray (values) {
    return EnumFromObject(values.reduce(
        (obj, value) => Object.assign(obj, EnumValue(value)), {}
    ));
}

function EnumFromString (values) {
    return EnumFromArray(values
        .split(/[\s]+/ig)
        .filter(v => v.length > 0)
    );
}

function EnumFromArrayFast (values) {
    const obj = {};
    const length = values.length;
    let index = -1;

    while (++index < length) {
        const key = values[index];

        obj[key] = key;
    }
    return EnumFromObject(obj);
}

function EnumFromMap (values) {
    return EnumFromObject(
        Array.from(values.keys()).reduce(
            (obj, key) => Object.assign(obj, EnumItem(key, values.get(key))), {}
        )
    );
}

function EnumFromSet (values) {
    return Array.from(values.values())
        .reduce((obj, value) => Object.assign(obj, EnumValue(value)), {});
}

exports = module.exports = Enum;
