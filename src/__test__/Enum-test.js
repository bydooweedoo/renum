'use strict';

import R from 'ramda';
import Immutable from 'immutable';
import expect from 'expect';
import renum from '..';

describe('renum', () => {

    it('should return frozen object', () => {
        expect(Object.isFrozen(renum([1, 2, 3]))).toBe(true);
    });

    it('should handle undefined', () => {
        expect(renum(undefined)).toEqual({});
    });

    it('should handle null', () => {
        expect(renum(null)).toEqual({});
    });

    it('should handle no arguments', () => {
        expect(renum()).toEqual({});
    });

    it('should handle Array Number values', () => {
        expect(renum([1, 2, 3])).toEqual({
            1: 1,
            2: 2,
            3: 3,
        });
    });

    it('should handle Array String values', () => {
        expect(renum(['one', 'two', 'three'])).toEqual({
            one: 'one',
            two: 'two',
            three: 'three',
        });
    });

    it('should handle arguments String values', () => {
        expect(renum('one', 'two', 'three')).toEqual({
            one: 'one',
            two: 'two',
            three: 'three',
        });
    });

    it('should handle Object values', () => {
        expect(renum({
            1: 1,
            2: 2,
            3: 3,
        })).toEqual({
            1: 1,
            2: 2,
            3: 3,
        });
    });

    it('should handle Map values', () => {
        const map = new Map();

        map.set('1', 1);
        map.set('2', 2);
        map.set('3', 3);
        expect(renum(map)).toEqual({
            1: 1,
            2: 2,
            3: 3,
        });
    });

    it('should handle Set values', () => {
        const set = new Set();

        set.add(1);
        set.add(2);
        set.add(3);
        expect(renum(set)).toEqual({
            1: 1,
            2: 2,
            3: 3,
        });
    });

    it('should handle pair values', () => {
        const inc = n => n + 1;
        const dec = n => n - 1;

        expect(renum([
            ['TRUE', true],
            ['FALSE', false],
        ])).toEqual({
            TRUE: true,
            FALSE: false,
        });
        expect(renum([
            ['INCREMENT', inc],
            ['DECREMENT', dec],
        ])).toEqual({
            INCREMENT: inc,
            DECREMENT: dec,
      });
    });

    it('should handle String', () => {
        expect(renum('1 2 3')).toEqual({
            1: '1',
            2: '2',
            3: '3',
        });
    });

    it('should handle String with new line and spaces', () => {
        expect(renum('\n  \t1  \n 2\t\t3\n')).toEqual({
            1: '1',
            2: '2',
            3: '3',
        });
    });

    it('should handle multiline template ES6 String', () => {
        expect(renum(`
            1
            2
            3
        `)).toEqual({
            1: '1',
            2: '2',
            3: '3',
        });
    });

    it('should handle multiple Enum merge', () => {
        expect(renum(0, renum(1, 2), renum([3, 4, 5]))).toEqual({
            0: 0,
            1: 1,
            2: 2,
            3: 3,
            4: 4,
            5: 5,
        });
    });

    it('should handle arguments Number values', () => {
        expect(renum(1, 2, 3)).toEqual({
            1: 1,
            2: 2,
            3: 3,
        });
    });

    it('should handle arguments Boolean values', () => {
        expect(renum(true, false, true)).toEqual({
            true: true,
            false: false,
        });
    });

    it('should handle arguments Symbol values', () => {
        expect(renum(Symbol('1'), Symbol('2'))).toEqual({
            'Symbol(1)': 'Symbol(1)',
            'Symbol(2)': 'Symbol(2)',
        });
    });

    it('should extend with given predicate and transform', () => {
        renum.extend(Immutable.List.isList, R.invoker(0, 'toArray'));
        expect(renum(Immutable.List.of(1, 2))).toEqual({
            1: 1,
            2: 2,
        });
    });

    it('should extend with given pairs of predicate and transform', () => {
        renum.extend([
            [Immutable.Map.isMap, R.invoker(0, 'toObject')],
            [Immutable.Seq.isSeq, R.invoker(0, 'toObject')],
            [Immutable.Stack.isStack, R.invoker(0, 'toJS')],
        ]);
        expect(renum(new Immutable.Map({1: 'one', 2: 'two'}))).toEqual({
            1: 'one',
            2: 'two',
        });
    });

    it('should override extend if predicates are equal', () => {
        const equals42 = R.equals(42);

        renum.extend(equals42, R.always(renum('ORIGINAL')));
        expect(renum(42)).toEqual({
            ORIGINAL: 'ORIGINAL',
        });

        renum.extend(R.equals(43), R.always(44));
        renum.extend(equals42, R.always(renum('UPDATED')));
        expect(renum(42)).toEqual({
            UPDATED: 'UPDATED',
        });
    });

    it('should keep rightmost value when encounters duplicate keys in different arguments', () => {
        expect(renum(1, {
            1: 'one',
            2: 2,
            3: 3,
        }, [
            [1, 'ONE'],
            [3, '3'],
        ])).toEqual({
            1: 'ONE',
            2: 2,
            3: '3',
        });
    });

    it('should keep rightmost value when encounters duplicate keys in same argument', () => {
        expect(renum([
            [1, 1],
            [1, 'one'],
            [2, 2],
            [3, 3],
            [1, 'ONE'],
            [3, '3'],
        ])).toEqual({
            1: 'ONE',
            2: 2,
            3: '3',
        });
    });

    it('should treat Array of multiple types as a regular Array', () => {
        expect(renum([[1, '1'], 2, 3])).toEqual({
            '1,1': [1, '1'],
            2: 2,
            3: 3,
        });
    });

});
