//  下面的代码打印什么内容，为什么？

function wait() {
  return new Promise((resolve) => setTimeout(resolve, 10 * 1000));
}

async function main() {
  console.time();
  await wait();
  await wait();
  await wait();
  console.timeEnd();
}
main();

// `await`起到阻塞功能，3 个`wait`异步函数按照顺序依次执行，
// 每个异步执行时间大概为 10s，3 个一起花费是 30s，即 30000ms。
// 实际输出结果稍大于 30000ms
