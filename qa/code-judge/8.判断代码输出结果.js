//  下面的代码打印什么内容，为什么？

{
  var name = "Tom";
  (function () {
    if (typeof name === "undefined") {
      var name = "Jack"; // var 变量提升到 if 之前 导致 name = "undefined"
      console.log("Goodbye " + name); // Goodbye Jack
    } else {
      console.log("Hello " + name);
    }
  })();
}

{
  var name = "Tom";
  (function () {
    if (typeof name == "undefined") {
      name = "Jack"; // 没有提升
      console.log("Goodbye " + name);
    } else {
      console.log("Hello " + name); // Hello Tom
    }
  })();
}
