// 手动实现节流函数 throttle

// 节流 (throttle): 每隔一段时间后执行一次，也就是降低频率，将高频操作优化成低频操作。
/// 通常使用场景: 滚动条事件 或者 resize 事件，通常每隔 100~500 ms 执行一次即可。
{
  // 不用立即执行
  const throttle = (fn, wait = 200) => {
    let canRun = true;
    return (...args) => {
      if (!canRun) return;
      canRun = false; // 执行时设置为 false
      setTimeout(() => {
        fn.apply(this, args);
        canRun = true; // 执行完成后重置为 true
      }, wait);
    };
  };
}
{
  // 先执行一次函数，再节流
  const throttle = (fn, wait = 200) => {
    let inThrottle;
    let lastId;
    let lastTime;

    return function (...args) {
      if (!inThrottle) {
        fn.apply(this, args); // 先执行一次
        inThrottle = true; // 打开节流开关
        lastTime = Date.now(); // 执行完成后开始计时
      } else {
        clearTimeout(lastId); // 先清除上次的定时器

        // 更新定时器
        lastId = setTimeout(() => {
          // 只有时间到了才执行
          if (Date.now() - lastTime >= wait) {
            fn.apply(this, args);
            lastTime = Date.now(); // 执行完成后重置时间
          }
        }, Math.max(wait - (Date.now() - lastTime), 0)); // 延迟时间：定时 - (现在时间 - 上次执行的时间) 或者 0
      }
    };
  };
}
