//  下面的代码打印什么内容，为什么？

// example 1
var a = {},
  b = "123",
  c = 123;
a[b] = "b";
a[c] = "c"; // 键名c 是变量，会执行 toString() 被转成字符串 '123'，所以会覆盖键名 b 的值
console.log(a[b]); // 'c'

// example 2
var a = {},
  b = Symbol("123"),
  c = Symbol("123");
a[b] = "b";
a[c] = "c"; // Symbol 类型键名不需要进行转换
console.log(a[b]); // 'b'

// example 3
var a = {},
  b = { key: "123" },
  c = { key: "456" };
a[b] = "b"; // 键名 b toSting() 后转换成 '[object Object]' 字符串
a[c] = "c"; // 键名 c toSting() 后转换成 '[object Object]' 字符串，所以会覆盖键名 b 的值
console.log(a[b]); // 'c'
