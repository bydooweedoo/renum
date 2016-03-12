'use strict';

import renum from '..';

suite('renum #Array', () => {
    bench('EMPTY', () => {
        renum([]);
    });

    bench('5 Number items', () => {
        renum([1, 2, 3, 4, 5]);
    });

    bench('5 String items', () => {
        renum(['1', '2', '3', '4', '5']);
    });
});

suite('renum #Arguments', () => {
    bench('EMPTY', () => {
        renum(undefined);
    });

    bench('5 Number items', () => {
        renum(1, 2, 3, 4, 5);
    });

    bench('5 String items', () => {
        renum('1', '2', '3', '4', '5');
    });
});

suite('renum #Object', () => {
    bench('EMPTY', () => {
        renum({});
    });

    bench('5 Number items', () => {
        renum({
            '1': 1,
            '2': 2,
            '3': 3,
            '4': 4,
            '5': 5,
        });
    });

    bench('5 String items', () => {
        renum({
            '1': '1',
            '2': '2',
            '3': '3',
            '4': '4',
            '5': '5',
        });
    });
});
