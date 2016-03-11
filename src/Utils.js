'use strict';

import R from 'ramda';

export const excludeEmpty = R.filter(R.pipe(R.length, R.gte(R.__, 1)));
