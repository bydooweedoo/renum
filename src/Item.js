'use strict';

import R from 'ramda';

export const KeyValue = (key, value) => R.assoc(
    R.ifElse(
        R.is(String),
        R.identity,
        String
    )(key), value
);

export const Single = value => KeyValue(value, value);

export const Pair = pair => KeyValue(pair[0], pair[1]);

export const boundWith = f => R.converge(R.call, [
    R.pipe(R.nthArg(1), f),
    R.nthArg(0),
]);

export const reduceWith = R.pipe(boundWith, R.flip(R.reduce)({}));
