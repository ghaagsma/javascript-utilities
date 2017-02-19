(() => {
    'use strict';

    let chai = require('chai'),
        stringUtilities = require('../src/string-utilities');

    before(() => {
        chai.should();
    });

    describe('string-utilities', () => {
        describe('compare', () => {
            it('should compare strings of equal length', () => {
                let a = '123',
                    b = '456';

                stringUtilities.compare(a, b).should.equal(-1);
                stringUtilities.compare(a, a).should.equal(0);
                stringUtilities.compare(b, b).should.equal(0);
                stringUtilities.compare(b, a).should.equal(1);
            });

            it('should compare strings with leading \'0\'s', () => {
                let a = '0000123',
                    b = '456',
                    c = '123';

                stringUtilities.compare(a, b).should.equal(-1);
                stringUtilities.compare(b, a).should.equal(1);
                stringUtilities.compare(a, c).should.equal(0);
            });

            it('should compare strings of non-equal length', () => {
                let a = '1230',
                    b = '456';

                stringUtilities.compare(a, b).should.equal(1);
                stringUtilities.compare(b, a).should.equal(-1);
            });
        });

        describe('add', () => {
            it('should add strings', () => {
                let a = '123',
                    b = '456';

                stringUtilities.add(a, b).should.equal('579');
            });
        });

        describe('isPalindrome', () => {
            it('should return false if input is not a palindrome', () => {
                stringUtilities.isPalindrome('ab').should.equal(false);
                stringUtilities.isPalindrome('abab').should.equal(false);
                stringUtilities.isPalindrome('abcdefg').should.equal(false);
                stringUtilities.isPalindrome('aaabbb').should.equal(false);
            });

            it('should return true if input is a palindrome', () => {
                stringUtilities.isPalindrome('a').should.equal(true);
                stringUtilities.isPalindrome('aba').should.equal(true);
                stringUtilities.isPalindrome('abba').should.equal(true);
                stringUtilities.isPalindrome('MadamImadaM').should.equal(true);
            });
        });
    });
})();
