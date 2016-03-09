'use strict';

const R = require('ramda');
const Valid = require('./Valid');
const debug = R.tap(console.log);
const operators = new Map();
const conditions = [[R.T, R.identity]];

const appendCondition = R.invoker(3, 'splice')(-1, 0, R.__, conditions);
const updateCondition = f => conditions[getOperator(f)] = f;
const getConditionIndex = R.pipe(R.always(conditions), R.length, R.dec);

const setOperator = R.invoker(2, 'set')(R.__, R.__, operators);
const setOperatorValue = R.flip(setOperator);
const hasOperator = R.invoker(1, 'has')(R.__, operators);
const getOperator = R.pipe(R.head, R.invoker(1, 'get')(R.__, operators));

const updateConditions = R.cond([
    [R.pipe(R.head, hasOperator), R.tap(updateCondition)],
    [R.T, R.pipe(
        R.tap(R.pipe(R.head, setOperatorValue(getConditionIndex()))),
        R.tap(appendCondition)
    )],
]);

const ExtendSingle = R.ifElse(
    R.both(
        R.pipe(R.length, R.equals(2)),
        R.both(
            R.pipe(R.head, Valid.isCondition),
            R.pipe(R.last, Valid.isOperator)
        )
    ),
    updateConditions,
    R.F
);

const Extend = R.unapply(R.ifElse(
    R.both(
        Valid.isSingleArg,
        R.pipe(R.head, Valid.arePairs)
    ),
    R.pipe(R.head, R.map(ExtendSingle)),
    ExtendSingle
));

Extend.conditions = conditions;

module.exports = Extend;
