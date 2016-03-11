'use strict';

import R from 'ramda';

export default map => {

    const set = R.invoker(2, 'set')(R.__, R.__, map);
    const setValue = R.flip(set);
    const setPair = p => set(p[0], p[1]);
    const has = R.invoker(1, 'has')(R.__, map);
    const hasPair = R.pipe(R.head, has);
    const get = R.invoker(1, 'get')(R.__, map);
    const getPair = R.pipe(R.head, get);

    return {
        'set': set,
        'get': get,
        setValue,
        has,
        hasPair,
        getPair,
        setPair,
    };
};
