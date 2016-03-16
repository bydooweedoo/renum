'use strict';

import R from 'ramda';

/**
 * Exclude empty value/strings from given list.
 *
 *      Utils.excludeEmpty(['a', '', 'b', '']) //=> ['a', 'b']
 *      Utils.excludeEmpty('a') //=> ['a']
 *      Utils.excludeEmpty(null) //=> []
 */
export const excludeEmpty = R.pipe(
    R.ifElse(
        R.is(Array),
        R.identity,
        R.of
    ),
    R.reject(R.either(R.isNil, R.isEmpty))
);

/**
 * Duplicate given value and return the result in an Array.
 *
 * 		Utils.duplicate(1) //=> [1, 1]
 */
export const duplicate = R.flip(R.repeat)(2);

/**
 * Transform given value to string.
 * Returns given value if already string.
 *
 * 		Utils.stringify(1) //=> "1"
 */
export const stringify = R.ifElse(
    R.is(String),
    R.identity,
    String
);
