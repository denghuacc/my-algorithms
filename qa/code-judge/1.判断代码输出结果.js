//  下面的代码打印什么内容，为什么？

var obj = {
  "2": 3,
  "3": 4,
  length: 2,
  splice: Array.prototype.splice,
  push: Array.prototype.push,
};
obj.push(1);
obj.push(2);
obj.push(3);
console.log(obj);

// 这是一个伪数组（类数组）

// 输出结果：
// {
//   '2': 1,
//   '3': 2,
//   '4': 3,
//   length: 5,
//   splice: [Function: splice],
//   push: [Function: push]
// }
