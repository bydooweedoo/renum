'use strict';

import R from 'ramda';
import * as Valid from './Valid';
import _predicates from './Predicates';
import _conditions from './Conditions';

const predicates = _predicates(new Map());
const conds = [
    [R.T, R.identity],
];
const conditions = _conditions(
    () => conds,
    next => {
        conds = next;
    }
);

const mergeConditions = R.cond([
    [predicates.hasPair, f => R.pipe(conditions.update(predicates.getPair(f), f))],
    [R.T, R.pipe(
        R.tap(R.pipe(R.head, predicates.setValue(conditions.getIndex()))),
        R.tap(conditions.append)
    )],
]);

const extendSingle = R.ifElse(
    R.both(
        R.pipe(R.length, R.equals(2)),
        R.both(
            R.pipe(R.head, Valid.isPredicate),
            R.pipe(R.last, Valid.isTransform)
        )
    ),
    mergeConditions,
    R.F
);

const extend = R.unapply(R.ifElse(
    R.both(
        Valid.isSingleArg,
        R.pipe(R.head, Valid.arePairs)
    ),
    R.pipe(R.head, R.map(extendSingle)),
    extendSingle
));

extend.getConditions = () => conds;

export default extend;
