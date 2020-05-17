// 修改以下 `print` 函数，使之输出 0 到 99，或者 99 到 0 (头条)

// 要求：
// 1. 只能修改 `setTimeout` 到 `Math.floor(Math.random() * 1000)` 的代码
// 2. 不能修改 `Math.floor(Math.random() * 1000)`
// 3. 不能使用全局变量

function print(n) {
  setTimeout(() => {
    console.log(n);
  }, Math.floor(Math.random() * 1000));
}
for (var i = 0; i < 100; i++) {
  print(i);
}

{
  // 解法一 增加第二个参数为常数 1
  function print(n) {
    setTimeout(
      () => {
        console.log(n);
      },
      1,
      Math.floor(Math.random() * 1000)
    );
  }
  for (var i = 0; i < 100; i++) {
    print(i);
  }
}

{
  // 解法二 直接打印 Node 会爆栈，chrome 可以输出
  function print(n) {
    setTimeout(console.log(n), Math.floor(Math.random() * 1000));
  }

  for (var i = 0; i < 100; i++) {
    print(i);
  }
}

{
  // 解法三 在包一层 setTimeout 必须设置时间大于或者等于 1000 * n
  function print(n) {
    setTimeout(() => {
      setTimeout(() => {
        console.log(n);
      }, 1000 * n);
    }, Math.floor(Math.random() * 1000));
  }
  for (var i = 0; i < 100; i++) {
    print(i);
  }
}
