'use strict';

import R from 'ramda';
import expect from 'expect';
import _extend from '../Extend';
import expectRenum from 'expect-renum';

expect.extend(expectRenum);

describe('extend', () => {

    it('should return a function', () => {
        expect(_extend).toBeA(Function);
    });

    it('should take 1 arguments (defaultConditions)', () => {
        expect(R.length(_extend)).toEqual(1);
    });

    describe('#getConditions', () => {

        let extend;

        beforeEach(() => {
            extend = _extend([[R.T, R.identity]]);
        });

        it('should be a function property', () => {
            expect(extend).toHaveProp('getConditions');
            expect(extend.getConditions).toBeA(Function);
        });

        it('should take no arguments', () => {
            expect(R.length(extend.getConditions)).toEqual(0);
        });

        it('should return defaults conditions', () => {
            expect(extend.getConditions()).toEqual([
                [R.T, R.identity],
            ]);
        });

    });

    describe('#extend', () => {

        let extend;

        beforeEach(() => {
            extend = _extend([[R.T, R.identity]]);
        });

        it('should be a function', () => {
            expect(extend).toBeA(Function);
        });

        it('should handle 2 arguments (predicate, transform)', () => {
            const result = extend(R.is(Number), R.always(4));
            const expected = [
                [R.is(Number), R.always(4)],
                [R.T, R.identity],
            ];

            expect(result).toEqual(expected);
            expect(result).toEqual(extend.getConditions());
        });

        it.skip('should handle multiple pairs arguments (Pair<predicate, transform>...)', () => {

        });

        it('should handle single pairs arguments (Array<Pair<predicate, transform>>)', () => {
            const result = extend([
                [R.is(String), R.invoker(0, 'trim')],
                [R.is(Number), R.dec],
            ]);
            const expected = [
                [R.is(String), R.invoker(0, 'trim')],
                [R.is(Number), R.dec],
                [R.T, R.identity],
            ];

            expect(extend.getConditions()).toEqual(expected);
        });

        it('should always append before last pair', () => {
            const expected = [
                [R.is(Number), R.inc],
                [R.is(String), R.pipe(R.length, R.inc)],
                [R.T, R.identity],
            ];

            extend(R.is(Number), R.inc);
            extend(R.is(String), R.pipe(R.length, R.inc));
            expect(extend.getConditions()).toEqual(expected);
        });

        it('should update existing predicate with given transform', () => {
            const isNumber = R.is(Number);
            const expected = [
                [isNumber, R.dec],
                [R.T, R.identity],
            ];

            extend(isNumber, R.inc);
            extend(isNumber, R.dec);
            expect(extend.getConditions()).toEqual(expected);
        });

    });

});
