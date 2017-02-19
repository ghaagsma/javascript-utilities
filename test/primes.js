(() => {
    'use strict';

    let chai = require('chai'),
        primes = require('../src/primes');

    before(() => {
        chai.should();
    });

    describe('primes', () => {
        it('should determine whether a number is prime', () => {
            primes.isPrime(0).should.equal(false);
            primes.isPrime(1).should.equal(false);
            primes.isPrime(2).should.equal(true);
            primes.isPrime(3).should.equal(true);
            primes.isPrime(10).should.equal(false);
            primes.isPrime(13).should.equal(true);
            primes.isPrime(29).should.equal(true);
            primes.isPrime(125).should.equal(false);
            primes.isPrime(54491).should.equal(false);
            primes.isPrime(54493).should.equal(true);
            primes.isPrime(54495).should.equal(false);
            primes.isPrime(54497).should.equal(true);
            primes.isPrime(54499).should.equal(true);
        });
    });
})();
