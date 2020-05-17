//  下面的代码打印什么内容，为什么？

function Foo() {
  Foo.a = function () {
    console.log(1);
  };
  this.a = function () {
    console.log(2);
  };
}
Foo.prototype.a = function () {
  console.log(3);
};
Foo.a = function () {
  console.log(4);
};

// print
Foo.a(); // 4 直接输出
const obj = new Foo(); // new 生成实例，执行 Foo 构造函数
obj.a(); // 2 实例直接使用本身已有的方法，不用去原型链中找
Foo.a(); // 1 实例化执行构建函数时，已经改变了 Foo.a 的值
