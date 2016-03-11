'use strict';

import R from 'ramda';

export const fromKeyValue = (key, value) => R.assoc(
    R.ifElse(
        R.is(String),
        R.identity,
        String
    )(key), value
);

export const fromSingle = value => fromKeyValue(value, value);

export const fromPair = value => fromKeyValue(value[0], value[1]);

export const boundWith = f => R.converge(R.call, [
    R.pipe(R.nthArg(1), f),
    R.nthArg(0),
]);

export const reduceWith = R.pipe(boundWith, R.flip(R.reduce)({}));
