// 简单改造下面的代码，使之分别打印 10 和 20

var b = 10;
(function b() {
  b = 20;
  console.log(b);
})();

{
  // print 10
  // 方法一 交换位置
  var b = 10;
  (function () {
    console.log(b);
    b = 20;
  })();

  // 方法二 使 b 失效
  var b = 10;
  (function () {
    this.b = 20;
    console.log(b);
  })();
}

{
  // print 20
  // 传入 b
  var b = 10;
  (function (b) {
    b = 20;
    console.log(b);
  })(b);

  // 方法二 重新声明 b
  var b = 10;
  (function () {
    var b = 20;
    console.log(b);
  })();

  // 方法三 b 赋值给 window，适用于浏览器
  var b = 10;
  (function () {
    window.b = 20;
    console.log(b);
  })();
}
