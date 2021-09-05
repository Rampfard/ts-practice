"use strict";
const groupBy = (arr, cb) => {
    const obj = {};
    for (let item of arr) {
        const key = cb(item);
        obj[key] = arr.filter((el) => cb(el) === key);
    }
    return obj;
};
console.log(groupBy([1.2, 1.1, 2.3, 0.4], Math.floor));
let result = {
    '0': [0.4],
    '1': [1.2, 1.1],
    '2': [2.3],
};
console.log(groupBy(['one', 'two', 'three'], (el) => el.length));
let result2 = {
    '3': ['one', 'two'],
    '5': ['three'],
};
var Gender;
(function (Gender) {
    Gender[Gender["Male"] = 0] = "Male";
    Gender[Gender["Female"] = 1] = "Female";
})(Gender || (Gender = {}));
console.log(groupBy([
    { g: Gender.Male, n: 'A' },
    { g: Gender.Female, n: 'B' },
    { g: Gender.Female, n: 'C' },
], (el) => el.g));
let result3 = {
    [Gender.Male]: [{ g: Gender.Male, n: 'A' }],
    [Gender.Female]: [
        { g: Gender.Female, n: 'B' },
        { g: Gender.Female, n: 'C' },
    ],
};
