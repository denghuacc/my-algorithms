// 手动实现 instanceof

function selfInstanceof(left, right) {
  const proto = left.__proto__; // 隐式原型
  const prototype = right.prototype; // 原型对象
  if (proto == null || (typeof left !== "object" && typeof left !== "function"))
    return false;
  return proto === prototype;
}

// test
const Person = function (name) {
  this.name = name;
};

const p1 = new Person("hale");
console.log(p1);

console.log(p1 instanceof Person);
console.log(selfInstanceof(p1, Person));
