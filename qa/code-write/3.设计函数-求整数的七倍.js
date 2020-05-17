//  不用加减乘除运算符，求整数的 7 倍

// 先定义位运算加法
const bitAdd = (m, n) => {
  while (m) {
    [m, n] = [(m & n) << 1, m ^ n];
  }
  return n;
};

{
  // 位运算
  // 位运算实现方式 1 - 循环累加 7 次
  const multiply7_bo_1 = (num) => {
    let sum = 0,
      counter = new Array(7); // 得到 [empty × 7]
    while (counter.length) {
      sum = bitAdd(sum, num);
      counter.shift();
    }
    return sum;
  };

  console.log(multiply7_bo_1(2));
}

{
  // 位运算实现方式 2 - 二进制进 3 位(乘以 8 )后，加自己的补码(乘以 -1 )
  const multiply7_bo_2 = (num) => bitAdd(num << 3, -num);

  console.log(multiply7_bo_2(2));
}

{
  // JS hack
  // hack 方式 1 - 利用 Function 的构造器 & 乘号的字节码
  const multiply7_hack_1 = (num) =>
    new Function(["return ", num, String.fromCharCode(42), "7"].join(""))();

  console.log(multiply7_hack_1(2));
}

{
  // hack 方式 2 - 利用 eval 执行器 & 乘号的字节码
  const multiply7_hack_2 = (num) =>
    eval([num, String.fromCharCode(42), "7"].join(""));

  console.log(multiply7_hack_2(2));
}

{
  // 进制转换方式 - 利用 toString 转为七进制整数；然后末尾补0(左移一位)后通过 parseInt 转回十进制
  const multiply7_base7 = (num) => parseInt([num.toString(7), "0"].join(""), 7);

  console.log(multiply7_base7(2));
}
