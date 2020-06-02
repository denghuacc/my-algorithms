// 手动实现 call apply bind

// 把函数放入 this 需要指向的对象里，在调用函数时 this 指向的自然就是对象本身
Function.prototype.selfCall = function (context = window) {
  // 给 context 对象添加一个属性 fn ，赋值为 this，即赋值为需要改变指向的函数本身，即 getValue
  // getValue.call(context, 'Hale', 18) => context.fn = getValue
  context.fn = this;
  const args = [...arguments].slice(1); // 取出 context 后面的参数
  const result = context.fn(...args); // => getValue('Hale', 18)
  delete context.fn; // 删除 fn
  return result; // 返回结果
};

// 同上，需要把第二个参数组展开
Function.prototype.selfApply = function (context = window) {
  context.fn = this;
  const result = arguments[1] ? context.fn(...arguments[1]) : context.fn();
  delete context.fn;
  return result;
};

Function.prototype.selfBind = function (context = window) {
  const self = this;
  const args = [...arguments].slice(1);

  // 返回一个函数
  return function F() {
    return this instanceof F // 判断生成的函数的原型和原来的函数是否相同。this 一般指全局对象 globalThis
      ? new self(...args, ...arguments)
      : self.call(context, ...args, ...arguments);
  };
};

// test
let obj = {
  value: "obj",
};

function getValue(name, age) {
  console.log(name, age, this.value);
}

getValue.selfCall(obj, "Hale", 18);

getValue.selfApply(obj, ["Hale", 18]);

console.log("===============");

const fn = getValue.selfBind(obj, "Amy", 20); // 传入参数，返回一个新的函数
fn(); // Amy 20 obj
fn("Hale", 18); // 还是 Amy 20 obj 绑定时传入的参数不会被覆盖

console.log("===============");

const fn2 = getValue.selfBind(obj); // 没有传入参数
fn2(); // undefined undefined 'obj'
fn2("Hale", 18); // Hale 18 obj 参数为传入的参数
