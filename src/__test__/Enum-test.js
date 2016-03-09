'use strict';

const R = require('ramda');
const expect = require('expect');
const Enum = require('../Enum');
const expectEnum = require('expect-enum');

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
        Enum.extend(R.equals(42), R.always(Enum(24)));
        expect(Enum(42)).toEqual({
            '24': 24,
        });
    });

    it.skip('should not be able to override Enum values', () => {
        expect(Enum('ADD', 'REMOVE', 'CLEAR')).toNotBeEditable();
    });

});
