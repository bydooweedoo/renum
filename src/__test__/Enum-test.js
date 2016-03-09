'use strict';

const R = require('ramda');
const expect = require('expect');
const Enum = require('../Enum');
const expectEnum = require('expect-enum');
const Immutable = require('immutable');

expect.extend(expectEnum);

describe('Enum', () => {

    it('should return frozen object', () => {
        expect(Enum([1, 2, 3])).toBeFrozen();
    });

    it('should handle undefined', () => {
        expect(Enum(undefined)).toEqual({});
    });

    it('should handle null', () => {
        expect(Enum(null)).toEqual({});
    });

    it('should handle Array Number values', () => {
        expect(Enum([1, 2, 3])).toEqual({
            '1': 1,
            '2': 2,
            '3': 3,
        });
    });

    it('should handle Array String values', () => {
        expect(Enum(['one', 'two', 'three'])).toEqual({
            'one': 'one',
            'two': 'two',
            'three': 'three',
        });
    });

    it('should handle arguments String values', () => {
        expect(Enum('one', 'two', 'three')).toEqual({
            'one': 'one',
            'two': 'two',
            'three': 'three',
        });
    });

    it('should handle Object values', () => {
        expect(Enum({
            '1': 1,
            '2': 2,
            '3': 3,
        })).toEqual({
            '1': 1,
            '2': 2,
            '3': 3,
        });
    });

    it('should handle Map values', () => {
        const map = new Map();

        map.set('1', 1);
        map.set('2', 2);
        map.set('3', 3);
        expect(Enum(map)).toEqual({
            '1': 1,
            '2': 2,
            '3': 3,
        });
    });

    it('should handle Set values', () => {
        const set = new Set();

        set.add(1);
        set.add(2);
        set.add(3);
        expect(Enum(set)).toEqual({
            '1': 1,
            '2': 2,
            '3': 3,
        });
    });

    it('should handle pair values', () => {
        expect(Enum([
            ['TRUE', true],
            ['FALSE', false],
        ])).toEqual({
            'TRUE': true,
            'FALSE': false,
        });
    });

    it('should handle String', () => {
        expect(Enum('1 2 3')).toEqual({
            '1': '1',
            '2': '2',
            '3': '3',
        });
    });

    it('should handle String with new line and spaces', () => {
        expect(Enum('\n  \t1  \n 2\t\t3\n')).toEqual({
            '1': '1',
            '2': '2',
            '3': '3',
        });
    });

    it('should handle multiline template ES6 String', () => {
        expect(Enum(`
            1
            2
            3
        `)).toEqual({
            '1': '1',
            '2': '2',
            '3': '3',
        });
    });

    it('should handle multiple Enum merge', () => {
        expect(Enum(0, Enum(1, 2), Enum([3, 4, 5]))).toEqual({
            '0': 0,
            '1': 1,
            '2': 2,
            '3': 3,
            '4': 4,
            '5': 5
        });
    });

    it('should handle arguments Number values', () => {
        expect(Enum(1, 2, 3)).toEqual({
            '1': 1,
            '2': 2,
            '3': 3
        });
    });

    it('should handle arguments Boolean values', () => {
        expect(Enum(true, false)).toEqual({
            'true': true,
            'false': false,
        });
    });

    it('should extend with given condition and operator', () => {
        Enum.extend(Immutable.List.isList, R.invoker(0, 'toArray'));
        expect(Enum(Immutable.List.of(1, 2))).toEqual({
            '1': 1,
            '2': 2,
        });
    });

    it('should extend with given pairs of condition and operator', () => {
        Enum.extend([
            [Immutable.Map.isMap, R.invoker(0, 'toObject')],
            [Immutable.Seq.isSeq, R.invoker(0, 'toObject')],
            [Immutable.Stack.isStack, R.invoker(0, 'toJS')],
        ]);
        expect(Enum(new Immutable.Map({ '1': 'one', '2': 'two', }))).toEqual({
            '1': 'one',
            '2': 'two',
        });
    });

    it('should override extend if condition are equal', () => {
        const equals42 = R.equals(42);

        Enum.extend(equals42, R.always(Enum('ORIGINAL')));
        expect(Enum(42)).toEqual({
            'ORIGINAL': 'ORIGINAL',
        });

        Enum.extend(R.equals(43), R.always(44));
        Enum.extend(equals42, R.always(Enum('UPDATED')));
        expect(Enum(42)).toEqual({
            'UPDATED': 'UPDATED',
        });
    });

});
