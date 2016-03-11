'use strict';

import R from 'ramda';

export default conditions => {

    const append = R.invoker(3, 'splice')(-1, 0, R.__, conditions);
    const update = R.curry((key, f) => conditions[key] = f);
    const getIndex = R.pipe(R.always(conditions), R.length, R.dec);

    return {
        append,
        update,
        getIndex,
    }
}
