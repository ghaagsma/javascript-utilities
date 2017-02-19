(() => {
    'use strict';

    let chai = require('chai'),
        factors = require('../src/factors');

    before(() => {
        chai.should();
    });

    let areEqual = (a, b) => {
        if (a.length !== b.length)
            return false;
        for (let i = 0; i < a.length; ++i) {
            if (a[i] !== b[i])
                return false;
        }
        return true;
    };

    describe('factors', () => {
        it('should get all factors for a number', () => {
            let expected = [1],
                result = factors.getFactors(1);
            areEqual(expected, result).should.equal(true);

            expected = [1, 2];
            result = factors.getFactors(2);
            areEqual(expected, result).should.equal(true);

            expected = [1, 3];
            result = factors.getFactors(3);
            areEqual(expected, result).should.equal(true);

            expected = [1, 2, 4];
            result = factors.getFactors(4);
            areEqual(expected, result).should.equal(true);

            expected = [1, 5];
            result = factors.getFactors(5);
            areEqual(expected, result).should.equal(true);

            expected = [1, 2, 3, 6];
            result = factors.getFactors(6);
            areEqual(expected, result).should.equal(true);

            expected = [1, 7];
            result = factors.getFactors(7);
            areEqual(expected, result).should.equal(true);

            expected = [1, 2, 4, 8];
            result = factors.getFactors(8);
            areEqual(expected, result).should.equal(true);

            expected = [1, 3, 9];
            result = factors.getFactors(9);
            areEqual(expected, result).should.equal(true);

            expected = [1, 2, 5, 10];
            result = factors.getFactors(10);
            areEqual(expected, result).should.equal(true);

            expected = [1, 3, 5, 15];
            result = factors.getFactors(15);
            areEqual(expected, result).should.equal(true);

            expected = [
                1, 2, 3, 4, 5, 6, 10, 12, 15, 20, 25, 30, 50, 60, 75, 100, 125,
                150, 250, 300, 375, 500, 750, 1500
            ];
            result = factors.getFactors(1500);
            areEqual(expected, result).should.equal(true);
        });
    });
})();
