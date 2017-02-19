(() => {
    'use strict';

    let isPrime = function (value) {
        if (value <= 1)
            return false;
        if (value === 2)
            return true;
        if (value % 2 === 0)
            return false;
        let limit = Math.floor(Math.sqrt(value));
        for (let i = 3; i <= limit; i += 2) {
            if (value % i === 0) {
                return false;
            }
        }
        return true;
    };

    module.exports = {
        isPrime: isPrime
    };
})();
