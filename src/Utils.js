'use strict';

const R = require('ramda');

const excludeEmpty = R.filter(R.pipe(R.length, R.gte(R.__, 1)));

module.exports = {
    excludeEmpty,
};
