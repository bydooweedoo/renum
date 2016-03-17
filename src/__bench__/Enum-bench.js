import R from 'ramda';
import Benchmark from 'benchmark';
import renum from '..';
import benchmarks from 'beautify-benchmark';

const suite = new Benchmark.Suite();
const getArray = () => [1, 2, 3, 4, 5];
const getPairs = () => ([
    [1, 1],
    [2, 2],
    [3, 3],
    [4, 4],
    [5, 5],
]);
const getObject = () => ({
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
});
const getSymbols = () => R.map(Symbol, getArray());

suite.add('arguments#5 items', () => {
    renum(1, 2, 3, 4, 5);
})
.add('String#5 items', () => {
    renum('1 2 3 4 5');
})
.add('Array#5 items', () => {
    renum(getArray());
})
.add('fromArray#5 items', () => {
    renum.fromArray(getArray());
})
.add('Pairs#5 items', () => {
    renum(getPairs());
})
.add('fromPairs#5 items', () => {
    renum.fromPairs(getPairs());
})
.add('Map#5 items', () => {
    renum(new Map(getPairs()));
})
.add('Set#5 items', () => {
    renum(new Set(getArray()));
})
.add('Symbol[]#5 items', () => {
    renum(getSymbols());
})
.add('Object#5 items', () => {
    renum(getObject());
})
.add('fromObject#5 items', () => {
    renum.fromObject(getObject());
})
.add('builtin Object.freeze#5 items', () => {
    Object.freeze(getObject());
})
.on('cycle', function(event) {
    benchmarks.add(event.target);
})
.on('complete', function() {
    benchmarks.log();
})
.run();
