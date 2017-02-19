(() => {
    'use strict';

    let chai = require('chai'),
        inputParser = require('../src/input-parser');

    before(() => {
        chai.should();
    });

    describe('input-parser', () => {
        it('should validate an integer', () => {
            inputParser.isInteger(1).should.equal(true);
        });

        it('should validate a valid string', () => {
            inputParser.isInteger('1').should.equal(true);
        });

        it('should validate an invalid string', () => {
            inputParser.isInteger('test').should.equal(false);
        });

        it('should validate undefined input', () => {
            inputParser.isInteger().should.equal(false);
        });

        it('should validate NaN', () => {
            inputParser.isInteger(NaN).should.equal(false);
        });
    });
})();
