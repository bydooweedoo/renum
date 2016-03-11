'use strict';

import R from 'ramda';

export default (getter, setter) => {
    const insertAt = (at, value) => R.insert(at, value, getter());
    const append = R.pipe(getter, R.length, R.dec, R.insert(R.__, R.__, getter), setter);//R.invoker(3, 'splice')(-1, 0, R.__, state);
    const update = () => R.pipe(R.update(R.__, R.__, getter()), setter)();
    const getIndex = () => R.pipe(getter, R.length, R.dec)();

    return {
        append,
        update,
        getIndex
    };
};
