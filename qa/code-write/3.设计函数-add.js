//  请实现一个 add 函数，满足以下功能
// add(1);       // 1
// add(1)(2);    // 3
// add(1)(2)(3); // 6
// add(1)(2, 3); // 6
// add(1, 2)(3); // 6
// add(1, 2, 3); // 6

const curry = (fn, arity = fn.length, ...args) =>
  arity <= args.length ? fn(...args) : curry.bind(null, fn, arity, ...args);

var add = curry((a) => a);
console.log(add(1));

var add = curry((a, b) => a + b);
console.log(add(1)(2));

var add = curry((a, b, c) => a + b + c);
console.log(add(1)(2)(3));
console.log(add(1)(2, 3));
console.log(add(1, 2)(3));
console.log(add(1, 2, 3));
