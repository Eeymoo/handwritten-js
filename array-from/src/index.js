module.exports = function (arrayLike, mapFn, thisArg) {
    const rulst = [];
    if (arrayLike === null || arrayLike === undefined) {
        throw TypeError();
    }
    if (typeof mapFn === 'function' && thisArg) {
        mapFn = mapFn.bind(thisArg);
    }
    for (let index = 0; index < arrayLike.length; index++) {
        const element = arrayLike[index] || undefined;
        const toMap = typeof mapFn === 'function' ? mapFn(element, index) : element;
        rulst.push(toMap);
    }
    return rulst;
}