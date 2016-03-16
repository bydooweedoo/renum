'use strict';

import R from 'ramda';
import expect, { createSpy } from 'expect';
import * as Utils from '../Utils';

describe('Utils', () => {

    it('should return an object', () => {
        expect(Utils).toBeAn(Object);
    });

    describe('#excludeEmpty', () => {

        it('should be a function property', () => {
            expect(Utils).toHaveProp('excludeEmpty');
            expect(Utils.excludeEmpty).toBeA(Function);
        });

        it('should exclude empty string from given array', () => {
            expect(Utils.excludeEmpty(['1', '', '2', ''])).toEqual(['1', '2']);
        });

        it('should exclude empty values from given array', () => {
            expect(Utils.excludeEmpty([1, 0, null, '', undefined, false])).toEqual([1, 0, false]);
        });

        it('should always return a list', () => {
            expect(Utils.excludeEmpty(null)).toEqual([]);
            expect(Utils.excludeEmpty('a')).toEqual(['a']);
        });

    });

    describe('#duplicate', () => {

        it('should be a function property', () => {
            expect(Utils).toHaveProp('duplicate');
            expect(Utils.duplicate).toBeA(Function);
        });

        it('should duplicate given argument and return array', () => {
            expect(Utils.duplicate('1')).toEqual(['1', '1']);
            expect(Utils.duplicate(null)).toEqual([null, null]);
        });

    });

    describe('#stringify', () => {

        it('should be a function property', () => {
            expect(Utils).toHaveProp('stringify');
            expect(Utils.stringify).toBeA(Function);
        });

        it('should transform to a String given argument', () => {
            expect(Utils.stringify(1)).toEqual('1');
            expect(Utils.stringify(null)).toEqual('null');
        });

    });

});
