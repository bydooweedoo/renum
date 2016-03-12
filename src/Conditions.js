'use strict';

import R from 'ramda';

export default (getter, setter) => {
    const getBeforeEndIndex = R.pipe(getter, R.length, R.dec);
    const append = R.pipe(
        pair => [getBeforeEndIndex(), pair, getter()],
        R.apply(R.insert),
        setter
    );
    const update = R.pipe(
        (index, pair) => [index, pair, getter()],
        R.apply(R.update),
        setter
    );

    return {
        append,
        update,
        getBeforeEndIndex,
    };
};
