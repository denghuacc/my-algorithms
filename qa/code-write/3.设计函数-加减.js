// 实现 (5).add(3).minus(2) 功能

Number.prototype.add = function (number) {
  return this.valueOf() + number;
  // return this + number // 这样也可以
};

Number.prototype.minus = function (number) {
  return this.valueOf() - number;
  // return this - number
};

// test
const ret = (5).add(3).minus(2);
console.log(ret); // 6
