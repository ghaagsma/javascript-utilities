(() => {
    'use strict';

    let chai = require('chai'),
        sorting = require('../src/sorting');

    before(() => {
        chai.should();
    });

    let compareObjects = (a, b) => {
        if (a.value > b.value)
            return 1;
        if (a.value < b.value)
            return -1;
        return 0;
    };

    let areEqual = (expected, actual, compareFunc) => {
        if (expected.length !== actual.length) {
            return `Expected array of length ${expected.length}. Was ` +
                `${actual.length}.`;
        }

        if (typeof (compareFunc) !== typeof (Function))
            compareFunc = (a, b) => {
                return a === b ? 0 : 1;
            };

        for (let i = 0; i < expected.length; ++i) {
            if (compareFunc(expected[i], actual[i]) !== 0) {
                return `Expected ${expected[i]} at index ${i}. Was ` +
                    `${actual[i]}.`;
            }
        }
        return true;
    };

    describe('sorting', () => {
        describe('quicksort', () => {
            it('should sort empty arrays', () => {
                let original = [],
                    expected = [];
                sorting.quickSort(original);
                areEqual(expected, original).should.equal(true);

                sorting.quickSort(original, compareObjects);
                areEqual(expected, original).should.equal(true);
            });

            it('should sort arrays of primitives', () => {
                let original = [1],
                    expected = [1];
                sorting.quickSort(original);
                areEqual(expected, original).should.equal(true);

                original = [1, 2, 3];
                expected = [1, 2, 3];
                sorting.quickSort(original);
                areEqual(expected, original).should.equal(true);

                original = [3, 2, 1];
                expected = [1, 2, 3];
                sorting.quickSort(original);
                areEqual(expected, original).should.equal(true);

                original = [3, 2, 1, 3, 3];
                expected = [1, 2, 3, 3, 3];
                sorting.quickSort(original);
                areEqual(expected, original).should.equal(true);
            });

            it('should sort arrays of objects', () => {
                let original = [{
                        value: 1
                    }],
                    expected = [{
                        value: 1
                    }];
                sorting.quickSort(original, compareObjects);
                areEqual(expected, original, compareObjects).should.equal(true);

                original = [{value: 1}, {value: 2}, {value: 3}];
                expected = [{value: 1}, {value: 2}, {value: 3}];
                sorting.quickSort(original, compareObjects);
                areEqual(expected, original, compareObjects).should.equal(true);

                original = [{value: 3}, {value: 2}, {value: 1}];
                expected = [{value: 1}, {value: 2}, {value: 3}];
                sorting.quickSort(original, compareObjects);
                areEqual(expected, original, compareObjects).should.equal(true);

                original = [
                    {value: 3}, {value: 2}, {value: 1}, {value: 3}, {value: 3}
                ];
                expected = [
                    {value: 1}, {value: 2}, {value: 3}, {value: 3}, {value: 3}
                ];
                sorting.quickSort(original, compareObjects);
                areEqual(expected, original, compareObjects).should.equal(true);
            });
        });
    });
})();
