import R from 'ramda';

/**
 * Check if given Array only has one element.
 *
 *      Utils.isSingleArg([1]) //=> true
 *      Utils.isSingleArg([]) //=> false
 *      Utils.isSingleArg([1, 2]) //=> false
 */
export const isSingleArg = R.pipe(R.length, R.equals(1));

/**
 * Check if given argument is a pair.
 *
 *      Utils.isPair([1, 2]) //=> true
 *      Utils.isPair([]) //=> false
 *      Utils.isPair([1, 2, 3]) //=> false
 *      Utils.isPair(null) //=> false
 */
export const isPair = R.both(
    R.is(Array),
    R.pipe(R.length, R.equals(2))
);

/**
 * Check if given argument contains only pairs.
 *
 *      Utils.arePairs([[1, 2]]) //=> true
 *      Utils.arePairs([[1, 2], [3, 4]]) //=> true
 *      Utils.arePairs([]) //=> false
 *      Utils.arePairs([[1, 2], [3, 4, 5]]) //=> false
 *      Utils.arePairs(null) //=> false
 */
export const arePairs = R.both(
    R.is(Array),
    R.pipe(
        R.reject(isPair),
        R.length,
        R.equals(0)
    )
);

/**
 * Check if given argument is a predicate.
 *
 *      Utils.isPredicate(value => value instanceof Array) //=> true
 *      Utils.isPredicate((key, value) => value instanceof Array) //=> false
 *      Utils.isPredicate([]) //=> false
 *      Utils.isPredicate({}) //=> false
 *      Utils.isPredicate(null) //=> false
 */
export const isPredicate = R.both(
    R.is(Function),
    R.pipe(
        R.prop('length'),
        R.equals(1)
    )
);

/**
 * Check if given argument is a predicate.
 *
 *      Utils.isTransform(() => true) //=> true
 *      Utils.isTransform(value => String(value)) //=> true
 *      Utils.isTransform((key, value) => [key, value].join(',')) //=> true
 *      Utils.isTransform([]) //=> false
 *      Utils.isTransform({}) //=> false
 *      Utils.isTransform(null) //=> false
 */
export const isTransform = R.both(
    R.is(Function),
    R.pipe(
        R.prop('length'),
        R.gte(R.__, 0)
    )
);
