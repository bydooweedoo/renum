'use strict';

import R from 'ramda';

export const isSingleArg = R.pipe(R.length, R.equals(1));

export const isPair = R.both(
    R.is(Array),
    R.pipe(R.length, R.equals(2))
);

export const arePairs = R.both(
    R.is(Array),
    R.pipe(
      R.reject(isPair),
        R.length,
        R.equals(0)
    )
);

export const isPredicate = R.both(
    R.is(Function),
    R.pipe(
        R.prop('length'),
        R.equals(1)
    )
);

export const isTransform = R.both(
    R.is(Function),
    R.pipe(
        R.prop('length'),
        R.gte(R.__, 0)
    )
);
