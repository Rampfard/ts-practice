import Currency from './source.js';

const instance = new Currency(200);

console.log(instance.dollars());
console.log(instance.add(100));
console.log(instance.format(true));
console.log(instance.cents());
console.log(instance.multiply(6));
console.log(instance.divide(6));
console.log(instance.distribute(6));
console.log(instance);
