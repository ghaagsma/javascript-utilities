(() => {
    'use strict';

    let getFactors = function (num) {
        if (num <= 0)
            throw new Error('Invalid input');
        if (num === 1)
            return [1];
        let result = [],
            limit = Math.floor(Math.sqrt(num));
        for (let i = 1; i <= limit; ++i) {
            let quotient = num / i;
            if (num % i === 0) {
                result.push(i);
                if (i !== quotient)
                    result.push(num / i);
            }
        }
        result.sort((a, b) => {
            return a - b;
        });
        return result;
    };

    module.exports = {
        getFactors: getFactors
    };
})();
