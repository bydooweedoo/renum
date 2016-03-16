'use strict';

import R from 'ramda';
import expect from 'expect';
import Predicates from '../Predicates';
import expectRenum from 'expect-renum';

expect.extend(expectRenum);

describe('Predicates', () => {

    const map = new Map();
    const predicates = Predicates(map);

    it('should return a function', () => {
        expect(Predicates).toBeA(Function);
    });

    describe('#set', () => {

        it('should be a function property', () => {
            expect(predicates).toHaveProp('set');
            expect(predicates.set).toBeA(Function);
        });

        it('should set given value at given key', () => {
            predicates.set('1', 2);
            expect(map.get('1')).toEqual(2);
        });

    });

    describe('#setValue', () => {

        it('should be a function property', () => {
            expect(predicates).toHaveProp('setValue');
            expect(predicates.setValue).toBeA(Function);
        });

        it('should set given value at given key', () => {
            predicates.setValue(1, '2');
            expect(map.get('2')).toEqual(1);
        });

    });

    describe('#has', () => {

        it('should be a function property', () => {
            expect(predicates).toHaveProp('has');
            expect(predicates.has).toBeA(Function);
        });

        it('should has existing key', () => {
            const equalsOne = R.equals(1);

            map.set(equalsOne, 'YES');
            expect(predicates.has(equalsOne)).toBe(true);
        });

        it('should not has unknown key', () => {
            expect(predicates.has('UNKNOWN')).toBe(false);
        });

    });

    describe('#get', () => {

        it('should be a function property', () => {
            expect(predicates).toHaveProp('get');
            expect(predicates.get).toBeA(Function);
        });

        it('should get existing key', () => {
            map.set('HAS', 'YES');
            expect(predicates.get('HAS')).toBe('YES');
        });

    });

});
