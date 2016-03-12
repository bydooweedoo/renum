'use strict';

import R from 'ramda';

export const excludeEmpty = R.filter(R.pipe(R.length, R.gte(R.__, 1)));

export const duplicate = R.flip(R.repeat)(2);

export const stringify = R.ifElse(
    R.is(String),
    R.identity,
    String
);
