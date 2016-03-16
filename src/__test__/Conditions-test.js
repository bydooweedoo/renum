'use strict';

import R from 'ramda';
import expect from 'expect';
import conditions from '../Conditions';
import expectRenum from 'expect-renum';

expect.extend(expectRenum);

describe('conditions', () => {

    let defaults = [
        [R.T, R.always(null)]
    ];
    const getter = () => defaults;
    const setter = next => {
        defaults = next;
    };
    const cond = conditions(getter, setter);

    it('should return a function', () => {
        expect(conditions).toBeA(Function);
    });

    it('should take 2 arguments (getter, setter)', () => {
        expect(R.length(conditions)).toEqual(2);
    });

    describe('#append', () => {

        it('should be a function property', () => {
            expect(cond).toHaveProp('append');
            expect(cond.append).toBeA(Function);
        });

        it('should take 1 argument (pair)', () => {
            expect(R.length(cond.append)).toEqual(1);
        });

        it('should append given pair', () => {
            expect(() => cond.append(
                [R.F, R.always(2)]
            )).toNotThrow();
            expect(getter()).toEqual([
                [R.F, R.always(2)],
                [R.T, R.always(null)],
            ]);
        });

    });

    describe('#update', () => {

        it('should be a function property', () => {
            expect(cond).toHaveProp('update');
            expect(cond.update).toBeA(Function);
        });

        it('should take 2 arguments (index, pair)', () => {
            expect(R.length(cond.update)).toEqual(2);
        });

        it('should update given pair at given index', () => {
            expect(() => cond.update(
                0,
                [R.F, R.always(3)]
            )).toNotThrow();
            expect(getter()).toEqual([
                [R.F, R.always(3)],
                [R.T, R.always(null)],
            ]);
        });

    });

    describe('#getBeforeEndIndex', () => {

        it('should be a function property', () => {
            expect(cond).toHaveProp('getBeforeEndIndex');
            expect(cond.getBeforeEndIndex).toBeA(Function);
        });

        it('should take no arguments', () => {
            expect(R.length(cond.getBeforeEndIndex)).toEqual(0);
        });

        it('should get before end index', () => {
            const length = getter().length;

            expect(cond.getBeforeEndIndex()).toEqual(length - 1);
        });

    });

});
