// 手动实现防抖函数 debounce

// 防抖 (debounce): 将多次高频操作优化为只在最后一次执行。
// 通常使用的场景是：用户输入，只需再输入完成后做一次输入校验即可。
{
  // 不用立即执行
  const debounce = (fn, wait = 200) => {
    let timeoutId;
    return function (...args) {
      clearTimeout(timeoutId); // 立即清除上次的定时器
      timeoutId = setTimeout(() => fn.apply(this, args), wait); // 重新开始计时
    };
  };
}
{
  // 先执行一次，再防抖
  const debounce = (fn, wait = 200) => {
    let timeoutId;
    let inDebounce;
    return function (...args) {
      if (!inDebounce) {
        fn.apply(this, args); // 先执行一次
        inDebounce = true; // 执行之后打开防抖开关
      } else {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn.apply(this, args), wait);
      }
    };
  };
}
