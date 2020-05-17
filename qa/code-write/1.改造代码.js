//  改造下面的代码，使之输出 0 - 9，写出你能想到的所有解法。

// 输出 10 个 10
for (var i = 0; i < 10; i++) {
  setTimeout(() => {
    console.log(i);
  }, 1000);
}

{
  // use let
  for (let i = 0; i < 10; i++) {
    setTimeout(() => {
      console.log(i);
    }, 1000);
  }
}

{
  // use IIFE
  for (var i = 0; i < 10; i++) {
    (function (i) {
      setTimeout(() => {
        console.log(i);
      }, 1000);
    })(i);
  }
}

{
  // use third setTimeout paramter
  for (var i = 0; i < 10; i++) {
    setTimeout(
      (i) => {
        console.log(i);
      },
      1000,
      i
    );
  }
}
