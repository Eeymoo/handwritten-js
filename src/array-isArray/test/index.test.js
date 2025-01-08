const { describe, test, expect } = require('@jest/globals');
const myIsArray = require('../src/index');

describe('myIsArray tests', () => {
    test('should return true for an empty array', () => {
        expect(myIsArray([])).toBe(true);
    });

    test('should return true for a new Array instance', () => {
        expect(myIsArray(new Array())).toBe(true);
    });

    test('should return false when no argument is passed', () => {
        expect(myIsArray()).toBe(false);
    });

    test('should return false for an object with Array constructor', () => {
        expect(myIsArray({ constructor: Array })).toBe(false);
    });

    test('should return false for an object with Array methods', () => {
        expect(myIsArray({ push: Array.prototype.push, concat: Array.prototype.concat })).toBe(false);
    });

    test('should return false for a number', () => {
        expect(myIsArray(17)).toBe(false);
    });

    // Mocking Object.prototype.toString
    Object.prototype.toString = function() { return "[object Array]"; };

    test('should return false for a plain object', () => {
        expect(myIsArray({})).toBe(false);
    });

    test('should return false for an object with Array prototype', () => {
        expect(myIsArray({ __proto__: Array.prototype })).toBe(false);
    });

    test('should return false for an object with length property', () => {
        expect(myIsArray({ length: 0 })).toBe(false);
    });
});