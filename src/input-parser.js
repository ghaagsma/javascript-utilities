(() => {
    'use strict';

    let fs = require('fs'),
        readline = require('readline');

    let isInteger = (value) => {
        return !isNaN(value) &&
            //jshint -W116
            parseInt(Number(value)) == value &&
            !isNaN(parseInt(value, 10));
    };

    let parseFileAsync = (filepath) => {
        let result = [];
        return new Promise((resolve) => {
            readline.createInterface({
                    input: fs.createReadStream(filepath),
                    terminal: false
                })
                .on('line', (line) => {
                    result.push(line);
                })
                .on('close', () => {
                    resolve(result);
                });
        });
    };

    module.exports = {
        isInteger: isInteger,
        parseFileAsync: parseFileAsync
    };
})();
