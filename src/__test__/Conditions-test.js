'use strict';

import R from 'ramda';
import expect from 'expect';
import conditions from '../Conditions';
import expectEnum from 'expect-enum';

expect.extend(expectEnum);

describe.only('conditions', () => {

    let defaults = [
        [R.T, R.always(null)]
    ];
    const cond = conditions({
        get: () => defaults,
        set (next) {
            defaults = next;
        }
    });

    it('should return a function', () => {
        expect(conditions).toBeA(Function);
    });

    describe('#append', () => {

        it('should be a function property', () => {
            expect(cond).toHaveProp('append');
            expect(cond.append).toBeA(Function);
        });

        it('should get state', () => {
            expect(cond.getState().length).toEqual(2);
            cond.append([[R.is(String), R.always('passed a string')]]);
            expect(cond.getState().length).toEqual(3);
            expect(cond.getState()).toEqual(newDefaults);
        });

    });

});
