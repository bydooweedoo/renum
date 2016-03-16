'use strict';

import R from 'ramda';
import expect, { createSpy } from 'expect';
import * as Item from '../Item';

describe('Item', () => {

    it('should return an object', () => {
        expect(Item).toBeAn(Object);
    });

    describe('#fromKeyValue', () => {

        it('should be a function property', () => {
            expect(Item).toHaveProp('fromKeyValue');
            expect(Item.fromKeyValue).toBeA(Function);
        });

        it('should returns function taking 1 argument after given 2 separate key, value arguments', () => {
            const oneKeyValue = Item.fromKeyValue(1, 'ONE');

            expect(oneKeyValue).toBeA(Function);
            expect(R.length(oneKeyValue)).toEqual(1);
        });

        it('should returns associated key/value within given object', () => {
            const oneKeyValue = Item.fromKeyValue(1, 'ONE');

            expect(oneKeyValue({})).toEqual({1: 'ONE'});
        });

        it('should override previously existing key/value within given object', () => {
            const oneKeyValue = Item.fromKeyValue(1, 'ONE');

            expect(oneKeyValue({1: '1'})).toEqual({1: 'ONE'});
        });

        it('should keep other keys/values untouched', () => {
            const oneKeyValue = Item.fromKeyValue(1, 'ONE');

            expect(oneKeyValue({1: '1', 2: '2'})).toEqual({1: 'ONE', 2: '2'});
        });

    });

    describe('#fromPair', () => {

        it('should be a function property', () => {
            expect(Item).toHaveProp('fromPair');
            expect(Item.fromPair).toBeA(Function);
        });

        it('should returns function taking 1 argument after given [key, value] pair argument', () => {
            const oneKeyValue = Item.fromPair([1, 'ONE']);

            expect(oneKeyValue).toBeA(Function);
            expect(R.length(oneKeyValue)).toEqual(1);
        });

        it('should returns associated key/value within given object', () => {
            const oneKeyValue = Item.fromPair([1, 'ONE']);

            expect(oneKeyValue({})).toEqual({1: 'ONE'});
        });

        it('should override previously existing key/value within given object', () => {
            const oneKeyValue = Item.fromPair([1, 'ONE']);

            expect(oneKeyValue({1: '1'})).toEqual({1: 'ONE'});
        });

        it('should keep other keys/values untouched', () => {
            const oneKeyValue = Item.fromPair([1, 'ONE']);

            expect(oneKeyValue({1: '1', 2: '2'})).toEqual({1: 'ONE', 2: '2'});
        });

    });

    describe('#fromSingle', () => {

        it('should be a function property', () => {
            expect(Item).toHaveProp('fromSingle');
            expect(Item.fromSingle).toBeA(Function);
        });

        it('should returns function taking 1 argument after given single argument', () => {
            const oneKeyValue = Item.fromSingle(1);

            expect(oneKeyValue).toBeA(Function);
            expect(R.length(oneKeyValue)).toEqual(1);
        });

        it('should returns associated key/value within given object', () => {
            const oneKeyValue = Item.fromSingle(1);

            expect(oneKeyValue({})).toEqual({1: 1});
        });

        it('should override previously existing key/value within given object', () => {
            const oneKeyValue = Item.fromSingle(1);

            expect(oneKeyValue({1: '1'})).toEqual({1: 1});
        });

        it('should keep other keys/values untouched', () => {
            const oneKeyValue = Item.fromSingle(1);

            expect(oneKeyValue({1: '1', 2: '2'})).toEqual({1: 1, 2: '2'});
        });

    });

    describe('#reduceWith', () => {

        it('should be a function property', () => {
            expect(Item).toHaveProp('reduceWith');
            expect(Item.reduceWith).toBeA(Function);
        });

        it('should returns function taking 1 argument after given single argument', () => {
            const custom = () => {custom: true};
            const reduceWithCustom = Item.reduceWith(custom);

            expect(reduceWithCustom).toBeA(Function);
            expect(R.length(reduceWithCustom)).toEqual(1);
        });

        it('should reduce with given function', () => {
            const accSpy = createSpy().andReturn({result: true})
            const itemSpy = createSpy().andReturn(accSpy);
            const reduceWithSpy = Item.reduceWith(itemSpy);

            expect(reduceWithSpy([1, 2, 3])).toEqual({result: true});

            expect(itemSpy).toHaveBeenCalled();
            expect(itemSpy.calls.length).toEqual(3);
            expect(itemSpy.calls[0].arguments).toEqual([1]);
            expect(itemSpy.calls[1].arguments).toEqual([2]);
            expect(itemSpy.calls[2].arguments).toEqual([3]);

            expect(accSpy).toHaveBeenCalled();
            expect(accSpy.calls.length).toEqual(3);
            expect(accSpy.calls[0].arguments).toEqual([{}]);
            expect(accSpy.calls[1].arguments).toEqual([{result: true}]);
            expect(accSpy.calls[2].arguments).toEqual([{result: true}]);
        });

    });

});
