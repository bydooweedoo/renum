'use strict';

import R from 'ramda';
import { isPredicate, isTransform, isSingleArg, arePairs } from './Valid';
import _predicates from './Predicates';
import _conditions from './Conditions';

const debug = R.tap(console.log);

export default defaultConditions => {
    const predicates = _predicates(new Map());
    let conds = R.ifElse(
        R.is(Array),
        R.identity,
        R.pipe(R.of, R.empty)
    )(defaultConditions);
    const getter = () => conds;
    const setter = next => { conds = next; };
    const conditions = _conditions(getter, setter);

    const mergeConditions = R.cond([
        [predicates.hasPair, f => R.pipe(
            R.tap(conditions.update(predicates.getPair(f), f)),
            getter
        )],
        [R.T, R.pipe(
            R.tap(R.pipe(R.head, predicates.setValue(conditions.getBeforeEndIndex()))),
            conditions.append,
            getter
        )],
    ]);

    const extendSingle = R.ifElse(
        R.both(
            R.pipe(R.length, R.equals(2)),
            R.both(
                R.pipe(R.head, isPredicate),
                R.pipe(R.last, isTransform)
            )
        ),
        mergeConditions,
        R.F
    );

    const extend = R.unapply(R.ifElse(
        R.both(
            isSingleArg,
            R.pipe(R.head, arePairs)
        ),
        R.pipe(R.head, R.map(extendSingle)),
        extendSingle
    ));

    extend.getConditions = () => conds;

    return extend;
};
