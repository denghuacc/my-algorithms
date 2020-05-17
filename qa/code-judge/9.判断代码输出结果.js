//  下面的代码打印什么内容，为什么？

function wait() {
  return new Promise((resolve) => setTimeout(resolve, 10 * 1000));
}

async function main() {
  console.time();
  const x = wait();
  const y = wait();
  const z = wait();
  await x;
  await y;
  await z;
  console.timeEnd();
}
main();

// 三个任务发起的时候没有 await，可以认为是同时发起了三个异步（并发）。
// 之后各自 await 任务的结果。结果按最高耗时计算，由于三个耗时一样。
// 所以结果是`10 * 1000ms`（实际结果稍大于这个值）
