//  实现一个 sleep 函数，比如 `sleep(1000)` 意味着等待 1000 毫秒，
// 可从 Promise、Generator、Async/Await 等角度实现

// Promise
const sleepPromise = (time) =>
  new Promise((resolve) => setTimeout(resolve, time));

sleepPromise(1000).then(() => console.log(123));

// Generator
function* sleepGen(time) {
  yield sleepPromise(time);
}

sleepGen(2000)
  .next()
  .value.then(() => {
    console.log(456);
  });

// async / await
const sleepAsync = async (time) => {
  await sleepPromise(time);
  console.log(789);
};

sleepAsync(3000);
