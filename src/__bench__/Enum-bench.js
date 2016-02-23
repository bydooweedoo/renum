'use strict';

const Enum = require('../Enum');

suite('Enum #Array', () => {
    bench('EMPTY', () => {
        Enum([]);
    });

    bench('5 Number items', () => {
        Enum([1, 2, 3, 4, 5]);
    });

    bench('5 String items', () => {
        Enum(['1', '2', '3', '4', '5']);
    });
});

suite('Enum #Arguments', () => {
    bench('EMPTY', () => {
        Enum(undefined);
    });

    bench('5 Number items', () => {
        Enum(1, 2, 3, 4, 5);
    });

    bench('5 String items', () => {
        Enum('1', '2', '3', '4', '5');
    });
});

suite('Enum #Object', () => {
    bench('EMPTY', () => {
        Enum({});
    });

    bench('5 Number items', () => {
        Enum({
            '1': 1,
            '2': 2,
            '3': 3,
            '4': 4,
            '5': 5,
        });
    });

    bench('5 String items', () => {
        Enum({
            '1': '1',
            '2': '2',
            '3': '3',
            '4': '4',
            '5': '5',
        });
    });
});
