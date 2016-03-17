import R from 'ramda';

export default map => {
    const set = R.invoker(2, 'set')(R.__, R.__, map);
    const setValue = R.flip(set);
    const setPair = R.apply(set);
    const has = R.flip(R.invoker(1, 'has'))(map);
    const hasPair = R.pipe(R.head, has);
    const get = R.flip(R.invoker(1, 'get'))(map);
    const getPair = R.pipe(R.head, get);

    return {
        set,
        get,
        setValue,
        has,
        hasPair,
        getPair,
        setPair,
    };
};
