const { test, expect } = require('@jest/globals');
const myArrayFrom = require('../src/index');

test('myArrayFrom should match Array.from for array-like objects', () => {
    const arrayLike = { 0: 'a', 1: 'b', 2: 'c', length: 3 };
    const result = myArrayFrom(arrayLike);
    const expected = Array.from(arrayLike);
    expect(result).toEqual(expected);
});

test('myArrayFrom should match Array.from for strings', () => {
    const str = 'hello';
    const result = myArrayFrom(str);
    const expected = Array.from(str);
    expect(result).toEqual(expected);
});

test('myArrayFrom should match Array.from for actual arrays', () => {
    const arr = [1, 2, 3];
    const result = myArrayFrom(arr);
    const expected = Array.from(arr);
    expect(result).toEqual(expected);
});

test('myArrayFrom should match Array.from for empty array-like objects', () => {
    const arrayLike = { length: 0 };
    const result = myArrayFrom(arrayLike);
    const expected = Array.from(arrayLike);
    expect(result).toEqual(expected);
});

test('myArrayFrom should handle null and undefined', () => {
    expect(() => myArrayFrom(null)).toThrow(TypeError);
    expect(() => myArrayFrom(undefined)).toThrow(TypeError);
});

test('myArrayFrom should apply mapFn and thisArg correctly', () => {
    const arrayLike = { 0: 1, 1: 2, 2: 3, length: 3 };
    const context = { multiplier: 2 };
    const mapFn = function(item) {
        return item * this.multiplier;
    };
    
    const result = myArrayFrom(arrayLike, mapFn, context);
    const expected = Array.from(arrayLike, mapFn, context);
    
    expect(result).toEqual(expected);
});

test('myArrayFrom should handle mapFn without thisArg', () => {
    const arrayLike = { 0: 1, 1: 2, 2: 3, length: 3 };
    const mapFn = (item) => item * 2;
    
    const result = myArrayFrom(arrayLike, mapFn);
    const expected = Array.from(arrayLike, mapFn);
    
    expect(result).toEqual(expected);
});

test('should return the same result as Array.from().map()', () => {
    // 定义一个类数组对象
    const arrayLike = {
        0: 'a',
        1: 'b',
        2: 'c',
        length: 3
    };

    // 定义映射函数
    const mapFn = function (element, index) {
        return `${index}: ${element.toUpperCase()}`;
    };

    // 使用 Array.from() 和 mapFn 创建新数组
    const resultFromArrayFrom = Array.from(arrayLike, mapFn);
    const resultFromMap = Array.from(arrayLike).map(mapFn);

    // 断言结果相同
    expect(resultFromArrayFrom).toEqual(resultFromMap);
});

test('should return the same result as Array.from().map() for Set and Map', () => {
    // 定义一个 Set 对象
    const set = new Set(['x', 'y', 'z']);

    // 定义映射函数
    const mapFn = function (element) {
        return element.toLowerCase() + '!';
    };

    // 使用 Array.from() 和 mapFn 创建新数组
    const resultFromSetArrayFrom = Array.from(set, mapFn);
    const resultFromSetMap = Array.from(set).map(mapFn);

    // 断言结果相同
    expect(resultFromSetArrayFrom).toEqual(resultFromSetMap);

    // 定义一个 Map 对象
    const map = new Map([
        [1, 'A'],
        [2, 'B'],
        [3, 'C']
    ]);

    // 定义映射函数
    const mapFnForMap = function ([key, value]) {
        return `${key}: ${value.toLowerCase()}`;
    };

    // 使用 Array.from() 和 mapFnForMap 创建新数组
    const resultFromMapArrayFrom = Array.from(map, mapFnForMap);
    const resultFromMapMap = Array.from(map).map(mapFnForMap);

    // 断言结果相同
    expect(resultFromMapArrayFrom).toEqual(resultFromMapMap);
});