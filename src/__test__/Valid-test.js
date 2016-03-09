'use strict';

const R = require('ramda');
const expect = require('expect');
const Valid = require('../Valid');

describe('Valid', () => {

    it('should return an object', () => {
        expect(Valid).toBeAn(Object);
    });

    describe('#isSingleArg', () => {

        it('should be a function property', () => {
            expect(Valid).toHaveProp('isSingleArg');
            expect(Valid.isSingleArg).toBeA(Function);
        });

        it('should returns true if only one arg', () => {
            expect(Valid.isSingleArg([1])).toBe(true);
        });

        it('should returns false if multiple args', () => {
            expect(Valid.isSingleArg([1, 2])).toBe(false);
        });

    });

    describe('#isPair', () => {

        it('should be a function property', () => {
            expect(Valid).toHaveProp('isPair');
            expect(Valid.isPair).toBeA(Function);
        });

        it('should returns true if given arg is a pair', () => {
            expect(Valid.isPair(['KEY', 'VAL'])).toBe(true);
        });

        it('should returns false if given arg is not a pair', () => {
            expect(Valid.isPair(['KEY'])).toBe(false);
            expect(Valid.isPair('KEY')).toBe(false);
            expect(Valid.isPair(null)).toBe(false);
            expect(Valid.isPair({})).toBe(false);
        });

    });

    describe('#arePairs', () => {

        it('should be a function property', () => {
            expect(Valid).toHaveProp('arePairs');
            expect(Valid.arePairs).toBeA(Function);
        });

        it('should returns true if given arg contain multiple pair', () => {
            expect(Valid.arePairs([
                ['KEY', 'VAL'],
                ['1', 1],
                ['2', 2],
            ])).toBe(true);
        });

        it('should returns false if given arg is not a pair', () => {
            expect(Valid.arePairs([[], [1, 2]])).toBe(false);
            expect(Valid.arePairs([[1, 2], [], [1, 2]])).toBe(false);
            expect(Valid.arePairs([[1, 2], [1, 2], []])).toBe(false);
            expect(Valid.arePairs('KEY')).toBe(false);
            expect(Valid.arePairs(null)).toBe(false);
            expect(Valid.arePairs({})).toBe(false);
        });

    });

    describe('#isPredicate', () => {

        it('should be a function property', () => {
            expect(Valid).toHaveProp('isPredicate');
            expect(Valid.isPredicate).toBeA(Function);
        });

        it('should returns true if given arg is a valid condition', () => {
            expect(Valid.isPredicate(R.is(Array))).toBe(true);
            expect(Valid.isPredicate(f => true)).toBe(true);
        });

        it('should returns falseif given arg is not a valid condition', () => {
            expect(Valid.isPredicate([1, 2])).toBe(false);
            expect(Valid.isPredicate(() => true)).toBe(false);
            expect(Valid.isPredicate((a, b, c) => true)).toBe(false);
        });

    });

    describe('#isTransform', () => {

        it('should be a function property', () => {
            expect(Valid).toHaveProp('isTransform');
            expect(Valid.isTransform).toBeA(Function);
        });

        it('should returns true if given arg is a valid condition', () => {
            expect(Valid.isTransform(R.of)).toBe(true);
            expect(Valid.isTransform((a, b, c) => {})).toBe(true);
        });

        it('should returns falseif given arg is not a valid condition', () => {
            expect(Valid.isTransform([1, 2])).toBe(false);
        });

    });

});
