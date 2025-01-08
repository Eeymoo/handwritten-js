module.exports = function (value) {
    let result = false;
    if (value === null) {
       return false; 
    }
    if (typeof value !== 'object') {
        return false;
    }
    if (value instanceof Array && Object.getPrototypeOf(value) === Array.prototype && Object.prototype.toString.call(value) === '[object Array]') {
        result = true;
    }
    return result;
}