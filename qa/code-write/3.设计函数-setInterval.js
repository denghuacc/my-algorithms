// 用`setTimeout`实现`setInterval`，阐述实现的效果与 setInterval 的差异

function mySetInterval() {
  mySetInterval.timer = setTimeout(() => {
    arguments[0]();
    mySetInterval(...arguments); // 无限递归
  }, arguments[1]);
}

mySetInterval.clear = function () {
  clearTimeout(mySetInterval.timer);
};

// test
mySetInterval(() => {
  console.log("hello world");
}, 1000);

setTimeout(() => {
  mySetInterval.clear();
}, 5000);
