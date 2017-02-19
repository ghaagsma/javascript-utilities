(() => {
    'use strict';

    let _swap = (array, a, b) => {
        let temp = array[a];
        array[a] = array[b];
        array[b] = temp;
    };

    let _partition = (array, p, r, compareFunc) => {
        let compare = !!compareFunc &&
            typeof (compareFunc) === typeof (Function) ?
            compareFunc : (a, b) => {
                if (a > b) return 1;
                if (b > a) return -1;
                return 0;
            },
            q = p;

        for (let j = p; j < r; ++j) {
            if (compare(array[j], array[r]) < 0) {
                _swap(array, j, q);
                ++q;
            }
        }

        _swap(array, q, r);
        return q;
    };

    let _quickSort = (array, p, r, compareFunc) => {
        if (p >= r)
            return;
        let q = _partition(array, p, r, compareFunc);
        _quickSort(array, p, q - 1, compareFunc);
        _quickSort(array, q + 1, r, compareFunc);
    };

    let quickSort = (array, compareFunc) => {
        return _quickSort(array, 0, array.length - 1, compareFunc);
    };

    module.exports = {
        quickSort: quickSort
    };
})();
