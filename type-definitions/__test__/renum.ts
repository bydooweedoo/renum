///<reference path='../renum.d.ts'/>

import renum = require('../lib/index.js');
import assert = require('assert');
import R = require('ramda');

var actions: renum.Enum<string, string>;

actions = renum('INCREMENT', 'DECREMENT');
assert(
    R.equals(actions, {INCREMENT: 'INCREMENT', DECREMENT: 'DECREMENT'}),
    'actions failed'
);

var pairs: renum.Pair[] = [
    ['a', 1],
    ['b', 2],
    ['c', 3],
];
var pairsResult = renum(pairs);
assert(
    R.equals(pairsResult, {a: 1, b: 2, c: 3}),
    'pairs failed'
);

var predicate: renum.Predicate = value => value instanceof Array;
var transform: renum.Transform = value => value.length;
var conditions: renum.Condition[] = [
    [predicate, transform],
];
var numbers: renum.Enum<string, number>;

renum.extend(conditions);
renum.extend(predicate, transform);
numbers = renum(['d'], ['a', 'b', 'c']);
assert(
    R.equals(numbers, {1: 1, 3: 3}),
    'numbers failed'
);

console.log('OK');
