'use strict';

const expect = require('expect');
const Predicates = require('../Predicates');
const expectEnum = require('expect-enum');

expect.extend(expectEnum);

describe('Predicates', () => {

    const map = new Map();
    const predicates = Predicates(map);

    it('should return a function', () => {
        expect(Predicates).toBeA(Function);
    });

    it('should have set method', () => {
        expect(predicates).toHaveProp('set');
        expect(predicates.set).toBeA(Function);
    });

    it('should have get method', () => {
        expect(predicates).toHaveProp('get');
        expect(predicates.get).toBeA(Function);
    });

    it('should have has method', () => {
        expect(predicates).toHaveProp('has');
        expect(predicates.has).toBeA(Function);
    });

    it('should have setValue method', () => {
        expect(predicates).toHaveProp('setValue');
        expect(predicates.setValue).toBeA(Function);
    });

    describe('#set', () => {

        it('should set given value at given key', () => {
            predicates.set('1', 2);
            expect(map.get('1')).toEqual(2);
        });

    });

    describe('#setValue', () => {

        it('should set given value at given key', () => {
            predicates.setValue(1, '2');
            expect(map.get('2')).toEqual(1);
        });

    });

    describe('#has', () => {

        it('should has existing key', () => {
            map.set('HAS', 'YES');
            expect(predicates.has('HAS')).toBe(true);
        });

        it('should not has unknown key', () => {
            expect(predicates.has('UNKNOWN')).toBe(false);
        });

    });

    describe('#get', () => {

        it('should get existing key', () => {
            map.set('HAS', 'YES');
            expect(predicates.get('HAS')).toBe('YES');
        });

    });

});
